import { useTicketOptionStore } from "../../dashboard/model/store/TicketOptionStore";
import Checkbox from "../../../../design-system/ui/Checkbox";
import { TicketOptionResponse } from "../../ticket/model/ticketInformation";

interface TicketOptionProps {
  options: TicketOptionResponse[];
}

const TicketOption = ({ options }: TicketOptionProps) => {
  const { currentPage, selectedOptions, setOption } = useTicketOptionStore();
  const currentSelectedOptions = selectedOptions[currentPage] || {};

  const handleChange = (
    type: "text" | "single" | "multiple",
    optionId: number,
    value: string | number
  ) => {
    if (type === "text") {
      setOption(currentPage, optionId, value as string);
    } else if (type === "single") {
      setOption(currentPage, optionId, value as number);
    } else if (type === "multiple") {
      const prevValues = (currentSelectedOptions[optionId] as number[]) || [];
      const newValues = prevValues.includes(value as number)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value as number];
      setOption(currentPage, optionId, newValues);
    }
    console.log(selectedOptions)
  };

  return (
    <div className="text-sm md:text-base font-semibold">
      {options.map((option) => (
        <div key={option.id} className="mt-4">
          <p>
            {option.name}
            {option.isMandatory && <span className="text-red-500">*</span>}
          </p>

          {option.type === "TEXT" && (
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-2"
              placeholder="입력해주세요"
              value={(currentSelectedOptions[option.id] as string) || ""}
              onChange={(e) =>
                handleChange("text", option.id, e.target.value)
              }
            />
          )}

          {option.type === "SINGLE" &&
            option.choices.map((choice) => (
              <Checkbox
                key={choice.id}
                label={choice.name}
                checked={currentSelectedOptions[option.id] === choice.id}
                onChange={() => handleChange("single", option.id, choice.id)}
                className="block mt-2"
              />
            ))}

          {option.type === "MULTIPLE" &&
            option.choices.map((choice) => (
              <Checkbox
                key={choice.id}
                label={choice.name}
                checked={(
                  (currentSelectedOptions[option.id] as number[]) || []
                ).includes(choice.id)}
                onChange={() => handleChange("multiple", option.id, choice.id)}
                className="block mt-2"
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TicketOption;
