import { useEffect} from 'react';
import { useResponseStore } from '../model/ResponseStore';
import { responsesInfo } from '../../../shared/types/responseType';
import ResponseFilter from './ResponseFilter';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { options } from '../../../shared/types/responseType';
import OptionSection from './OptionSection';

interface ResponsesListProps {
    listType: 'summary' | 'query' | 'individual';
}

const ResponsesList = ({ listType }: ResponsesListProps) => {
    const { response, selectedField, setSelectedField, selectedResponse, setSelectedResponse, uniqueResponseNames,itemsPerPage,
        currentIndex,setItemsPerPage,setCurrentIndex, queryOptions, fieldMap, fieldMapToKorean } = useResponseStore();

    useEffect(() => {
        if (listType === 'individual') {
            setItemsPerPage(1);
        } else if (listType === 'summary') {
            setItemsPerPage(4);
        } else {
            setItemsPerPage(10);
        }
    }, [listType]);

    const handleFieldChange = (field: string) => {
        const mappedField = fieldMap[field];
        setSelectedField(mappedField);
    };

    const handleSelectResponse = (responseName: string) => {
        const filteredResponses = response.filter((res) => res.name === responseName);
        setSelectedResponse(filteredResponses);
        setCurrentIndex(() => 0);
    };

    const renderSection = (title: string, key: keyof typeof responsesInfo[0]) => {
        const currentPageResponses = response.slice(currentIndex, currentIndex + itemsPerPage);
        return (
            <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
                    <p>{title}</p>
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

    return (
        <div>
            {listType === 'summary' && (
                <>
                    {renderSection('이름', 'name')}
                    {renderSection('전화번호', 'phone')}
                    {renderSection('이메일', 'email')}
                </>
            )}
            {listType === 'query' && (
                <ResponseFilter
                    responses={response}
                    selectedField={fieldMapToKorean[selectedField]}
                    setSelectedField={handleFieldChange}
                    setCurrentIndex={setCurrentIndex}
                    currentIndex={currentIndex}
                    itemsPerPage={itemsPerPage}
                    responsesLength={response.length}
                    options={queryOptions}
                />
            )}
            {listType === 'query' && renderSection({ name: '이름', phone: '전화번호', email: '이메일' }[selectedField], selectedField)}
            {listType === 'individual' && (
                <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                    <ResponseFilter
                        responses={response}
                        selectedField={selectedResponse.length > 0 ? selectedResponse[0].name : ''}
                        setSelectedField={handleSelectResponse}
                        setCurrentIndex={setCurrentIndex}
                        currentIndex={currentIndex}
                        itemsPerPage={itemsPerPage}
                        responsesLength={selectedResponse.length}
                        options={uniqueResponseNames}
                    />

                    {selectedResponse.length > 0 ? (
                        selectedResponse.slice(currentIndex, currentIndex + itemsPerPage).map((response) => (
                            
                            <div className="p-4" key={response.id}>
                                <UnderlineTextField
                                    label="이름"
                                    value={response.name}
                                    onChange={() => { }}
                                    placeholder="이름"
                                    errorMessage={''}
                                    className="mb-4"
                                />
                                <UnderlineTextField
                                    label="학년"
                                    value={response.grade}
                                    onChange={() => { }}
                                    placeholder="학년"
                                    errorMessage={''}
                                    className="mb-4"
                                />
                                <UnderlineTextField
                                    label="학번"
                                    value={response.num}
                                    onChange={() => { }}
                                    placeholder="학번"
                                    errorMessage={''}
                                    className="mb-4"
                                />
                                <UnderlineTextField
                                    label="전화번호"
                                    value={response.phone}
                                    onChange={() => { }}
                                    placeholder="전화번호"
                                    errorMessage={''}
                                    className="mb-4"
                                />
                                <UnderlineTextField
                                    label="이메일"
                                    value={response.email}
                                    onChange={() => { }}
                                    placeholder="이메일"
                                    errorMessage={''}
                                    className="mb-4"
                                />
                                <OptionSection responses={[response]} options={options} />
                            </div>
                        ))
                    ) : (
                        <p>선택된 응답자가 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResponsesList;
