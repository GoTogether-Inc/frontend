import { TOption } from "../../dashboard/model/TicketOptionStore";
import { useTicketOptionStore } from "../../dashboard/model/TicketOptionStore";
import Checkbox from "../../../../design-system/ui/Checkbox";

interface TicketOptionProps {
    options: TOption[];
}
const TicketOption = ({ options }: TicketOptionProps) => {
    const { currentPage, selectedOptions, setOption } = useTicketOptionStore();
    const currentSelectedOptions = selectedOptions[currentPage] || {};

    const handleChange = (type: string, optionName: string, value: string) => {
        if (type === "text" || type === "single") {
            setOption(currentPage, optionName, value);
        } else if (type === "multiple") {
            const prevValues = (currentSelectedOptions[optionName] as string[]) || [];
            const newValues = prevValues.includes(value)
                ? prevValues.filter((v) => v !== value)
                : [...prevValues, value];
            setOption(currentPage, optionName, newValues);
        }
    };

    return (
        <div className="text-sm md:text-base font-semibold">
            {options.map((option, index) => (
                <div key={index} className="mt-4">
                    <p>
                        {option.optionName} {option.required && <span className="text-red-500">*</span>}
                    </p>

                    {option.type === "text" && (
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md mt-2"
                            placeholder="입력해주세요"
                            value={currentSelectedOptions[option.optionName] || ""}
                            onChange={(e) => handleChange("text", option.optionName, e.target.value)}
                        />
                    )}

                    {option.type === "single" &&
                        option.choices.map((choice) => (
                            <Checkbox
                                key={choice}
                                label={choice}
                                checked={currentSelectedOptions[option.optionName] === choice}
                                onChange={() => handleChange("single", option.optionName, choice)}
                                className="block mt-2"
                            />
                        ))}

                    {option.type === "multiple" &&
                        option.choices.map((choice) => (
                            <Checkbox
                                key={choice}
                                label={choice}
                                checked={(currentSelectedOptions[option.optionName] as string[])?.includes(choice)}
                                onChange={() => handleChange("multiple", option.optionName, choice)}
                                className="block mt-2"
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};
export default TicketOption;

// 임의 데이터
export const options: TOption[] = [
    {
        type: 'text',
        optionName: '성함을 알려주세요.',
        required: true,
        choices: ['']
    },
    {
        type: 'single',
        optionName: '티셔츠 사이즈 선택해주세요.',
        required: true,
        choices: ['S', 'M', 'L', 'XL']
    },
    {
        type: 'multiple',
        optionName: '선택해주세요.',
        required: false,
        choices: ['1', '2', '3', '4']
    },
]