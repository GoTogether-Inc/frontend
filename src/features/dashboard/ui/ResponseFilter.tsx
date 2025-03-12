import { responsesData } from '../../../shared/types/responseType';
import DropDown from '../../../shared/ui/DropDown';

interface ResponseFilterProps {
    responses: responsesData[];
    selectedField: string; 
    setSelectedField: (field: string) => void; 
    setCurrentIndex: (updateFn: (prevIndex: number) => number) => void; 
    currentIndex: number;
    itemsPerPage: number;
    responsesLength: number;
    options: string[];  // 필드값 대신 옵션만 받음
}

const ResponseFilter = ({
    selectedField,
    setSelectedField,
    setCurrentIndex,
    currentIndex,
    itemsPerPage,
    responsesLength,
    options  
}: ResponseFilterProps) => {
    return (
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center">
                <div className="w-2/3">
                    <DropDown
                        options={options}  
                        selectedValue={selectedField} 
                        onSelect={(value) => {
                            setSelectedField(value); 
                            setCurrentIndex(() => 0);  
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
                    <span>{Math.floor(currentIndex / itemsPerPage) + 1} / {Math.ceil(responsesLength / itemsPerPage)}</span>
                    <button
                        onClick={() => setCurrentIndex((prev) => Math.min(prev + itemsPerPage, responsesLength - 1))}
                        disabled={currentIndex + itemsPerPage >= responsesLength}
                        className="px-3 py-1 border border-transparent disabled:opacity-50"
                    >
                        ＞
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResponseFilter;
