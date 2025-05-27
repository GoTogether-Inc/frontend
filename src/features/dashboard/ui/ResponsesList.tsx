import { useResponseStore } from '../model/store/ResponseStore';
import ResponseFilter from './ResponseFilter';
import SelectedResponseList from './SelectedResponseList';
import { useEffect } from 'react';
import { TicketOptionAnswerResponse } from '../../ticket/model/ticketInformation';
import MultiplePieCharts from './MultiplePieCharts';

interface ResponsesListProps {
  listType: 'summary' | 'query' | 'individual';
  ticketOptionResponses: TicketOptionAnswerResponse[];
}

const ResponsesList = ({ listType, ticketOptionResponses }: ResponsesListProps) => {
  const {
    response,
    selectedResponse,
    setSelectedResponse,
    currentIndex,
    setCurrentIndex,
  } = useResponseStore();

  useEffect(() => {
    setCurrentIndex(() => 0);
  }, [listType, setCurrentIndex]);

  const renderList = () => {
    switch (listType) {
      case 'summary':
        return (
          <>
            <div className="flex justify-center">
              <div style={{ minWidth: '300px', maxWidth: '600px', width: '100%' }}>
                <MultiplePieCharts responses={ticketOptionResponses} />
              </div>
              
            </div>
          </>
        );
      
      case 'individual':
        return (
          <div>
            <ResponseFilter
              responses={response}
              listType={listType}
              selectedField={
                selectedResponse.length > 0
                  ? { v1: selectedResponse[0].name, v2: selectedResponse[0].email }
                  : { v1: '전체', v2: '' }
              }
              setSelectedField={setSelectedResponse}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
              responsesLength={selectedResponse.length > 0 ? selectedResponse.length : response.length}
              options={[{ v1: '전체', v2: '' }, ...response.map(res => ({ v1: res.name, v2: res.email }))]}
            />
            <SelectedResponseList currentIndex={currentIndex} />
          </div>
        );
      default:
        return null;
    }
  };
  return <div>{renderList()}</div>;
};

export default ResponsesList;
