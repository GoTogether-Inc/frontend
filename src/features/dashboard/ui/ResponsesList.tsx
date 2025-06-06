import { useResponseStore } from '../model/store/ResponseStore';
import { useEffect } from 'react';
import { TicketOption } from '../../ticket/model/ticketInformation';
import MultiplePieCharts from './MultiplePieCharts';
import { usePersonalTicketOptionAnswers } from '../../ticket/hooks/useTicketOptionHook';
import IndividualResponseViewer from './IndividualResponseViewer';

interface ResponsesListProps {
  listType: 'summary' | 'query' | 'individual';
  ticketOptionResponses: TicketOption[];
  ticketId: number;
}

const ResponsesList = ({ listType, ticketOptionResponses, ticketId }: ResponsesListProps) => {
  const { data, isLoading, error } = usePersonalTicketOptionAnswers(ticketId);

  const { currentIndex, setCurrentIndex } = useResponseStore();

  useEffect(() => {
    setCurrentIndex(() => 0);
  }, [listType, setCurrentIndex]);

  const renderList = () => {
    switch (listType) {
      case 'summary': {
        return (
          <div className="space-y-4">
            {ticketOptionResponses.map(option => {
              if (option.optionType === 'TEXT') {
                return (
                  <div key={option.optionId} className="bg-white p-4 rounded shadow-sm">
                    <div className="flex justify-between items-center text-xs px-2 md:px-3 py-3">
                      <p className="text-base font-bold">{option.optionName}</p>
                      <p>응답 {option.ticketOptionAnswers.length}개</p>
                    </div>
                    {option.ticketOptionAnswers.length === 0 ? (
                      <p className="text-sm text-gray-500">응답이 없습니다.</p>
                    ) : (
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {option.ticketOptionAnswers.map(answer => (
                          <div key={answer.id} className="text-xs bg-gray-100 px-3 py-2 rounded">
                            {answer.answer}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={option.optionId} className="flex justify-center">
                  <div className="w-full max-w-[600px] min-w-[300px]">
                    <MultiplePieCharts responses={[option]} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      case 'individual': {
        if (isLoading) return <p>로딩 중...</p>;
        if (error || !data?.result) return <p>데이터를 불러오지 못했습니다.</p>;
        const allOrders = data.result.flatMap(user => user.orders);
        if (allOrders.length === 0) {
          return <p className="text-center text-gray-500">응답이 없습니다.</p>;
        }
        return (
          <IndividualResponseViewer orders={allOrders} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        );
      }

      default:
        return null;
    }
  };

  return <div>{renderList()}</div>;
};

export default ResponsesList;
