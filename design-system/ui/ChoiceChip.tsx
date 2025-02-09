import { useState } from 'react';

interface ChoiceChipProps {
  label?: string;
  options: string[];
  onSelect: (selected: string) => void;
  className?: string;
  labelClassName?: string;
}

const ChoiceChip = ({ label, options, onSelect, className, labelClassName = '' }: ChoiceChipProps) => {
  const [selected, setSelected] = useState(options[0]);

  const handleClick = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <>
      <label className={`block px-1 font-semibold text-gray-700 ${labelClassName}`}>{label}</label>
      <div className={`flex justify-between bg-gray-300 rounded-full p-1 ${className}`}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`
            flex justify-center items-center sm:text-xs md:text-sm lg:text-base px-2 rounded-full
            ${selected === option ? 'bg-white text-black' : 'text-black bg-transparent'}
          `}
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

export default ChoiceChip;
