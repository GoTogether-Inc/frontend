import { useResponseStore } from '../model/ResponseStore';
import { responsesInfo } from '../../../shared/types/responseType';
import ResponseFilter from './ResponseFilter';
import SelectedResponseList from './SelectedResponseList';
import { createFieldMappings } from '../../../shared/lib/createFieldMappings';
import { useEffect } from 'react';

interface ResponsesListProps {
    listType: 'summary' | 'query' | 'individual';
}

const ResponsesList = ({ listType }: ResponsesListProps) => {
    const { response, selectedField, setSelectedField, selectedResponse, setSelectedResponse, currentIndex, setCurrentIndex } = useResponseStore();
    const { fieldMap, fieldMapToKorean } = createFieldMappings(response);
    const queryOptions = response && response[0]
        ? Object.keys(response[0])
            .filter(key => key !== 'id' && key !== 'selectedOptions')
            .map(key => ({
                v1: fieldMap[key] || key,
                v2: ""
            }))
        : [];

    useEffect(() => {
        setCurrentIndex(() => 0);
    }, [listType, setCurrentIndex]);

    const renderSection = (title: string, key: keyof typeof responsesInfo[0], isSummaryPage: boolean) => {
        const transTitle = fieldMapToKorean[title];

        return (
            <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
                    <p className='text-base font-bold'>{transTitle}</p>
                    <p>응답 {response.length}개</p>
                </div>

                {response.length === 0 ? (
                    <p>응답이 없습니다.</p>
                ) : (
                    <div className={isSummaryPage ? "h-full max-h-48 overflow-y-auto space-y-2" : "h-full overflow-y-auto space-y-2"}>
                        {response.map((response) => (
                            <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3 gap-2" key={response.id}>
                                <p>{typeof response[key] === 'object' ? JSON.stringify(response[key]) : response[key]}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderList = () => {
        switch (listType) {
            case 'summary':
                return (
                    <>
                        {renderSection('name', 'name', true)}
                        {renderSection('phone', 'phone', true)}
                        {renderSection('email', 'email', true)}
                        {renderSection('grade', 'grade', true)}
                        {renderSection('email', 'email', true)}
                    </>
                );
            case 'query':
                return (
                    <>
                        <ResponseFilter
                            responses={response}
                            listType={listType}
                            selectedField={{ v1: fieldMapToKorean[selectedField], v2: "" }}
                            setSelectedField={setSelectedField}
                            setCurrentIndex={setCurrentIndex}
                            currentIndex={currentIndex}
                            responsesLength={queryOptions.length}
                            options={queryOptions}
                        />
                        {renderSection(selectedField, selectedField as keyof typeof responsesInfo[0], false)}
                    </>
                );
            case 'individual':
                return (
                    <div>
                        <ResponseFilter
                            responses={response}
                            listType={listType}
                            selectedField={selectedResponse.length > 0 ?
                                { v1: selectedResponse[0].name, v2: selectedResponse[0].email } : { v1: '전체', v2: '' }}
                            setSelectedField={setSelectedResponse}
                            setCurrentIndex={setCurrentIndex}
                            currentIndex={currentIndex}
                            responsesLength={selectedResponse.length > 0 ? selectedResponse.length : response.length}
                            options={[{ v1: '전체', v2: '' },
                            ...response.map((res) => ({ v1: res.name, v2: res.email }))]}
                        />
                        <SelectedResponseList
                            currentIndex={currentIndex}
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
