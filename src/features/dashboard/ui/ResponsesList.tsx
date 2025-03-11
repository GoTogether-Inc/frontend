import { useEffect, useState } from 'react';
import type { responsesData } from '../../../shared/types/responseType';
import { responsesInfo } from '../../../shared/types/responseType';

import DropDown from '../../../shared/ui/DropDown';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { options } from '../../../shared/types/responseType';
import OptionSection from './OptionSection';

interface ResponsesListProps {
    listType: 'summary' | 'query' | 'individual';
}

const ResponsesList = ({ listType }: ResponsesListProps) => {
    const [responses, setResponses] = useState<responsesData[]>(() => responsesInfo);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevPage = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, filteredResponses.length - 1));
    };

    //질문
    const [selectedField, setSelectedField] = useState<'name' | 'phone' | 'email'>('name');

    //개별 조회
    const [selectedResponse, setSelectedResponse] = useState<any | null>(null);
    const [selectedResponseName, setSelectedResponseName] = useState<string>();
    const filteredResponses = responses.filter(response =>
        selectedResponseName == response.name
    );
    const uniqueResponseNames = [...new Set(responses.map(response => response.name))];

    useEffect(() => {
        if (listType === 'individual') {
            setItemsPerPage(1);
        } else if (listType === 'summary') {
            setItemsPerPage(4);
        } else {
            setItemsPerPage(10);
        }
    }, [listType]);

    const fieldMap: Record<string, 'name' | 'phone' | 'email'> = {
        '이름': 'name',
        '전화번호': 'phone',
        '이메일': 'email',
    };

    const handleSelectResponse = (responseName: string) => {
        const response = responses.find(r => r.name === responseName);
        setSelectedResponse(response || null);
        setSelectedResponseName(responseName);
        setCurrentIndex(0);
    };

    const renderSection = (title: string, key: keyof typeof responsesInfo[0]) => {
        const currentPageResponses = responses.slice(currentIndex, currentIndex + itemsPerPage);
        return (
            <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
                    <p>{title}</p>
                    <p>응답 {responses.length}개</p>
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
            {listType === 'query' && (
                <div className="bg-white p-4 flex flex-col gap-2 mb-4">
                    <div className="flex justify-between items-center">
                        <div className="w-2/3">
                            <DropDown
                                options={['이름', '전화번호', '이메일']}
                                selectedValue={{ name: '이름', phone: '전화번호', email: '이메일' }[selectedField]}
                                onSelect={(value) => {
                                    setSelectedField(fieldMap[value]);
                                    setCurrentIndex(0);
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <button
                                onClick={() => setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0))}
                                disabled={currentIndex === 0}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＜
                            </button>
                            <span>{Math.floor(currentIndex / itemsPerPage) + 1} / {Math.ceil(responses.length / itemsPerPage)}</span>
                            <button
                                onClick={() => setCurrentIndex((prev) => Math.min(prev + itemsPerPage, responses.length - 1))}
                                disabled={currentIndex + itemsPerPage >= responses.length}
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
                                onClick={handlePrevPage}
                                disabled={currentIndex === 0}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＜
                            </button>
                            <span>{Math.floor(currentIndex / itemsPerPage) + 1} / {Math.ceil(filteredResponses.length / itemsPerPage)}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentIndex + 1 >= filteredResponses.length}
                                className="px-3 py-1 border border-transparent disabled:opacity-50"
                            >
                                ＞
                            </button>
                        </div>

                    </div>
                    {filteredResponses.length > 0 ? (
                        filteredResponses.slice(currentIndex, currentIndex + itemsPerPage).map((response) => (
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