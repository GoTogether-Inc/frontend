import IconButton from '../../../../design-system/ui/buttons/IconButton';
import { responsesData } from '../../../shared/types/responseType';
import DropDown from '../../../shared/ui/DropDown';
import { createFieldMappings } from '../../lib/createFieldMappings';
import rightButton from '../../../../public/assets/main/RightButton.svg';
import leftButton from '../../../../public/assets/main/LeftButton.svg';

interface ResponseFilterProps {
    responses: responsesData[];
    listType: 'summary' | 'query' | 'individual';
    selectedField: { v1: string; v2: string };
    setSelectedField: (v1: string, v2: string) => void;
    setCurrentIndex: (updateFn: (prevIndex: number) => number) => void;
    currentIndex: number;
    responsesLength: number;
    options: { v1: string; v2: string }[];
}

const ResponseFilter = ({
    responses,
    listType,
    selectedField,
    setSelectedField,
    setCurrentIndex,
    currentIndex,
    responsesLength,
    options
}: ResponseFilterProps) => {
    const { fieldMapToKorean } = createFieldMappings(responses);
    const optionsToKorean = options.map(option => ({
        v1: fieldMapToKorean[option.v1] || option.v1,
        v2: option.v2
    }));
    const handlePageChange = (direction: 'prev' | 'next') => {
        const nextIndex = direction === 'prev' ? Math.max(currentIndex - 1, 0) : Math.min(currentIndex + 1, responsesLength - 1);
        setCurrentIndex(() => nextIndex);

        const nextOption = options[nextIndex];

        if (nextOption) {
            setSelectedField(nextOption.v1, nextOption.v2);
        }
    };
    return (
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center">
                <div className="w-2/3">
                    <DropDown
                        options={optionsToKorean}
                        selectedValue={selectedField.v1}
                        onSelect={(selectedName, selectedEmail) => {
                            const selectedOption = options.find(opt =>
                                (listType === 'query' ? fieldMapToKorean[opt.v1] === selectedName : opt.v1 === selectedName) &&
                                opt.v2 === selectedEmail
                            );
                            if (selectedOption) {
                                setSelectedField(selectedOption.v1, selectedOption.v2);
                                setCurrentIndex(() => 0);
                            }
                        }}
                    />
                </div>
                <div className="flex items-center gap-1 md:gap-2 ml-auto ">
                    <IconButton
                        iconPath={<img src={leftButton} alt="왼쪽 버튼" />}
                        onClick={() => {
                            if (listType === 'individual') {
                                setCurrentIndex((prev) => Math.max(prev - 1, 0));
                            } else {
                                handlePageChange('prev');
                            }
                        }}
                    />
                    <span className='text-sm md:text-base w-10 text-center'>{Math.floor(currentIndex / 1) + 1} / {Math.ceil(responsesLength / 1)}</span>
                    <IconButton
                        iconPath={<img src={rightButton} alt="오른쪽 버튼" />}
                        onClick={() => {
                            if (listType === 'individual') {
                                setCurrentIndex((prev) => Math.min(prev + 1, responsesLength - 1));
                            } else {
                                handlePageChange('next');
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResponseFilter;
