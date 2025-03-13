import { responsesData } from '../../../shared/types/responseType';
import DropDown from '../../../shared/ui/DropDown';

interface ResponseFilterProps {
    responses: responsesData[];
    selectedField: { name: string; email: string }; 
    setSelectedField: (name: string, email: string) => void; 
    setCurrentIndex: (updateFn: (prevIndex: number) => number) => void; 
    currentIndex: number;
    itemsPerPage: number;
    responsesLength: number;
    options: { v1: string; v2: string }[];    
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
                        selectedValue={selectedField.name} 
                        onSelect={(selectedName,selectedEmail) => {
                            const selectedOption = options.find(opt => opt.v1 === selectedName && opt.v2 === selectedEmail);
                            if (selectedOption) {
                                setSelectedField(selectedOption.v1, selectedOption.v2); 
                                setCurrentIndex(() => 0);  
                            }
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
