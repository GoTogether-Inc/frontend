import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { TicketOption, TicketOptionAnswer } from '../../ticket/model/ticketInformation';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

type MultiplePieChartsProps = {
  responses: TicketOption[];
};

const MultiplePieCharts = ({ responses }: MultiplePieChartsProps) => {
  const aggregateAnswers = (answers: TicketOptionAnswer[]) => {
    const countMap: Record<string, number> = {};

    answers.forEach(({ answer }) => {
      countMap[answer] = (countMap[answer] || 0) + 1;
    });

    return Object.entries(countMap).map(([name, value]) => ({ name, value }));
  };

  if (responses.length === 0) {
    return <p className="text-center text-gray-500 py-8">응답 데이터가 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 bg-white">
      {responses.map((option, index) => {
        const data = aggregateAnswers(option.ticketOptionAnswers);

        return (
          <div key={`${option.optionId}-${index}`} className="flex flex-col items-center">
            <h3 className="mb-2 font-semibold text-lg">{option.optionName}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label stroke="none">
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default MultiplePieCharts;
