import Checkbox from "../../../../design-system/ui/Checkbox";
import { Option } from "../../../shared/types/responseType";

interface Response {
  id: string;
  name: string;
  selectedOptions: {
    [key: string]: string;
  };
}

interface OptionSectionProps {
  responses: Response[];
  options: Option[];
}

const OptionSection = ({ responses, options }: OptionSectionProps) => {
  return (
    <div>
      {responses.map((response) => (
        <div key={response.id}>
          {options.map((option) => {
            const selectedChoice = response.selectedOptions[option.optionName];

            return (
              <div key={option.optionName}>
                <p className="block mb-2 text-l">{option.optionName}</p>
                <ul className="space-y-1">
                  {option.choices.map((choice: string) => (
                    <li key={choice}>
                      <Checkbox
                        label={choice}
                        checked={selectedChoice === choice}
                        onChange={() => {}}
                        disabled={selectedChoice !== choice}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default OptionSection;
