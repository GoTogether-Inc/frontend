import { useEffect, useState } from 'react';
import { responsesInfo } from '../../../shared/types/responseType';
import DropDown from '../../../shared/ui/DropDown';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { options } from '../../../shared/types/responseType';
import Checkbox from '../../../../design-system/ui/Checkbox';

interface ResponsesListProps {
    listType: 'summary' | 'query' | 'individual';
}

const ResponsesList = ({ listType }: ResponsesListProps) => {
    const [responses, setResponses] = useState<any[]>([]);
    //질문 페이지
    const [selectedField, setSelectedField] = useState<'name' | 'phone' | 'email'>('name');
    const [queryPage, setQueryPage] = useState(1);
    const itemsPerPage = 4;
    const queryPages = Math.ceil(responses.length / itemsPerPage);
    //개별 조회 페이지
    const [individualPage, setIndividualPage] = useState(1);
    const [selectedResponse, setSelectedResponse] = useState<any | null>(null);
    const [selectedResponseName, setSelectedResponseName] = useState<string>();
    const filteredResponses = responses.filter(response =>
        selectedResponseName == response.name
    );
    const itemsPerPage2 = 1;
    const individualPages = Math.ceil(filteredResponses.length / itemsPerPage2);
    const uniqueResponseNames = [...new Set(responses.map(response => response.name))]; 

    useEffect(() => {
        setResponses(responsesInfo);
    }, []);


    const fieldMap: Record<string, 'name' | 'phone' | 'email'> = {
        '이름': 'name',
        '전화번호': 'phone',
        '이메일': 'email',
    };

    const handleSelectResponse = (responseName: string) => {
        const response = responses.find(r => r.name === responseName);
        setSelectedResponse(response || null);
        setSelectedResponseName(responseName);
        setIndividualPage(1);
    };

    const renderSection = (title: string, key: keyof typeof responsesInfo[0]) => {
        const paginatedResponses = responses.slice(
            (queryPage - 1) * itemsPerPage,
            queryPage * itemsPerPage
        );

        return (
            <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
                    <p>{title}</p>
                    <p>응답 {responses.length}개</p>
                </div>

                {paginatedResponses.length === 0 ? (
                    <p>응답이 없습니다.</p>
                ) : (
                    paginatedResponses.map((response) => (
                        <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={response.ticketNum}>
                            <p>{response[key]}</p>
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div>
            {listType === 'query' && (
                <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                    <div className="flex justify-between items-center">
                        <div className="w-2/3">
                            <DropDown
                                options={['이름', '전화번호', '이메일']}
                                selectedValue={{ name: '이름', phone: '전화번호', email: '이메일' }[selectedField]}
                                onSelect={(value) => {
                                    setSelectedField(fieldMap[value]);
                                    setQueryPage(1);
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <button
                                onClick={() => setQueryPage((prev) => Math.max(prev - 1, 1))}
                                disabled={queryPage === 1}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＜
                            </button>
                            <span>{queryPage} / {queryPages}</span>
                            <button
                                onClick={() => setQueryPage((prev) => Math.min(prev + 1, queryPages))}
                                disabled={queryPage === queryPages}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＞
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {listType === 'query' && renderSection({ name: '이름', phone: '전화번호', email: '이메일' }[selectedField], selectedField)}

            {listType === 'summary' && (
                <>
                    {renderSection('이름', 'name')}
                    {renderSection('전화번호', 'phone')}
                    {renderSection('이메일', 'email')}
                </>
            )}

            {listType === 'individual' && (
                <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                    <div className="flex justify-between items-center">
                        <div className="w-2/3">
                            <DropDown
                                options={uniqueResponseNames}
                                selectedValue={selectedResponse ? selectedResponse.name : ''}
                                onSelect={handleSelectResponse}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <button
                                onClick={() => setIndividualPage((prev) => Math.max(prev - 1, 1))}
                                disabled={individualPage === 1}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＜
                            </button>
                            <span>{individualPage} / {individualPages}</span>
                            <button
                                onClick={() => setIndividualPage((prev) => Math.min(prev + 1, individualPages))}
                                disabled={individualPage === individualPages}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＞
                            </button>
                        </div>
                    </div>
                    {filteredResponses.length > 0 ? (
                        filteredResponses.slice((individualPage - 1) * itemsPerPage2, individualPage * itemsPerPage2).map((response) => (
                            <div className="p-4">
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
                                {options.map((option) => {
                                    const selectedChoice = response.selectedOptions[option.optionName];
                                    return (
                                        <div key={option.optionName} >
                                            <p className="block mb-2 text-l">{option.optionName}</p>
                                            <ul className="space-y-1">
                                                {option.choices.map((choice) => (
                                                    <li>
                                                        <Checkbox
                                                            label={choice as string}  
                                                            checked={selectedChoice === choice}  
                                                            onChange={() => { }} 
                                                            disabled={selectedChoice != choice}  
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}

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
