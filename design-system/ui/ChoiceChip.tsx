import { useEffect, useState } from 'react';

interface ChoiceChipOption {
  label?: string; // UI에 보여질 한국어
  value?: string; // 서버에서 오는 값
}

interface ChoiceChipProps {
  label?: string;
  value?: string;
  options: ChoiceChipOption[];
  onSelect: (selected: string) => void;
  className?: string;
  labelClassName?: string;
  buttonClassName?: string;
}

const ChoiceChip = ({
  label,
  options,
  onSelect,
  className,
  labelClassName = '',
  buttonClassName = '',
  value,
}: ChoiceChipProps) => {
  const [selected, setSelected] = useState(value || options[0]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleClick = (optionValue: string) => {
    setSelected(optionValue);
    onSelect(optionValue);
  };

  return (
    <div>
      <label className={`block px-1 font-semibold text-gray-700 mb-2 ${labelClassName}`}>{label}</label>
      <div className={`flex justify-between bg-gray-300 rounded-full p-1 ${className}`}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`
            flex justify-center items-center sm:text-xs md:text-sm lg:text-base px-2 rounded-full
            ${selected === option.value ? 'bg-white text-black' : 'text-black bg-transparent'}
            ${buttonClassName}
          `}
            onClick={() => handleClick(option.value || '')}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoiceChip;
