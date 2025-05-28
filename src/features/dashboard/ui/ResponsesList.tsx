import { useResponseStore } from '../model/store/ResponseStore';
import { useEffect } from 'react';
import { TicketOptionAnswerResponse } from '../../ticket/model/ticketInformation';
import MultiplePieCharts from './MultiplePieCharts';
import { usePersonalTicketOptionAnswers } from '../../ticket/hooks/useTicketOptionHook';
import IndividualResponseViewer from './IndividualResponseViewer';

interface ResponsesListProps {
  listType: 'summary' | 'query' | 'individual';
  ticketOptionResponses: TicketOptionAnswerResponse[];
  ticketId: number;
}

const ResponsesList = ({ listType, ticketOptionResponses, ticketId }: ResponsesListProps) => {
  const { data, isLoading, error } = usePersonalTicketOptionAnswers(ticketId);

  const {
    currentIndex,
    setCurrentIndex,
  } = useResponseStore();

  useEffect(() => {
    setCurrentIndex(() => 0);
  }, [listType, setCurrentIndex]);

  const renderTextResponses = (responses: TicketOptionAnswerResponse[]) => {
    const textResponses = responses.filter((res) => res.optionType === 'TEXT');
    if (textResponses.length === 0) return null;

    return (
      <>
        {textResponses.map((textResponse) => (
          <div className="bg-white p-4 flex flex-col gap-2 mb-4" key={textResponse.optionId}>
            <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
              <p className="text-base font-bold">{textResponse.optionName}</p>
              <p>응답 {textResponse.answers.length}개</p>
            </div>

            {textResponse.answers.length === 0 ? (
              <p>응답이 없습니다.</p>
            ) : (
              <div className="h-full max-h-48 overflow-y-auto space-y-2">
                {textResponse.answers.map((answer) => (
                  <div
                    className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3 gap-2"
                    key={answer.id}
                  >
                    <p>{answer.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const renderList = () => {
    switch (listType) {
      case 'summary':
        const filteredResponses = ticketOptionResponses.filter(
          (option) => option.optionType !== 'TEXT'
        );
        console.log(filteredResponses)
        return (
          <>
            <div className="flex justify-center">
              <div style={{ minWidth: '300px', maxWidth: '600px', width: '100%' }}>
                <MultiplePieCharts responses={filteredResponses} />
              </div>
            </div>
            {renderTextResponses(ticketOptionResponses)}
          </>
        );

      case 'individual':
        if (isLoading) return <p>로딩 중...</p>;
        if (error || !data?.result) return <p>데이터를 불러오지 못했습니다.</p>;
        const allOrders = data.result.flatMap(user => user.orders);
        return (
          <IndividualResponseViewer
            orders={allOrders}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      default:
        return null;
    }
  };
  return <div>{renderList()}</div>;
};
export default ResponsesList;

