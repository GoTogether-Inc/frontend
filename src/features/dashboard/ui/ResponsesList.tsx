import { useResponseStore } from '../model/ResponseStore';
import { responsesInfo } from '../../../shared/types/responseType';
import ResponseFilter from './ResponseFilter';
import SelectedResponseList from './SelectedResponseList';

interface ResponsesListProps {
    listType: 'summary' | 'query' | 'individual';
    
}

const ResponsesList = ({ listType}: ResponsesListProps) => {
    const { response, selectedField, setSelectedField, selectedResponse, setSelectedResponse, itemsPerPage,
        currentIndex, setCurrentIndex, queryOptions, fieldMapToKorean} = useResponseStore();
        
    const renderSection = (title: string, key: keyof typeof responsesInfo[0]) => {
        const currentPageResponses = response.slice(currentIndex, currentIndex + itemsPerPage);
        const transTitle = fieldMapToKorean[title];
        return (
            <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
                    <p>{transTitle}</p>
                    <p>응답 {response.length}개</p>
                </div>

                {currentPageResponses.length === 0 ? (
                    <p>응답이 없습니다.</p>
                ) : (
                    currentPageResponses.map((response) => (
                        <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={response.id}>
                            <p>{typeof response[key] === 'object' ? JSON.stringify(response[key]) : response[key]}</p>
                        </div>
                    ))
                )}
            </div>
        );
    };
    const renderList = () => {
        switch (listType) {
            case 'summary':
                return (
                    <>
                        {renderSection('name', 'name')}
                        {renderSection('phone', 'phone')}
                        {renderSection('email', 'email')}
                    </>
                );
            case 'query':
                return (
                    <>
                        <ResponseFilter
                            responses={response}
                            selectedField={{ name: fieldMapToKorean[selectedField], email: "" }}
                            setSelectedField={setSelectedField}
                            setCurrentIndex={setCurrentIndex}
                            currentIndex={currentIndex}
                            itemsPerPage={itemsPerPage}
                            responsesLength={response.length}
                            options={queryOptions}
                        />
                        {renderSection(selectedField, selectedField as keyof typeof responsesInfo[0])}
                    </>
                );
            case 'individual':
                return (
                    <div>
                        <ResponseFilter
                            responses={response}
                            selectedField={selectedResponse.length > 0 ? 
                                { name: selectedResponse[0].name, email: selectedResponse[0].email } : { name: '전체', email: '' }}
                            setSelectedField={setSelectedResponse}
                            setCurrentIndex={setCurrentIndex}
                            currentIndex={currentIndex}
                            itemsPerPage={itemsPerPage}
                            responsesLength={selectedResponse.length > 0 ? selectedResponse.length : response.length}
                            options={[{ v1: "전체", v2: "" }, ...response.map((res) => ({ v1: res.name, v2: res.email }))]}
                        />
                        <SelectedResponseList
                            currentIndex={currentIndex}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div>
            {renderList()}
        </div>
    );
};

export default ResponsesList;
