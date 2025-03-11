import { useState } from 'react';

interface DropDownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const DropDown = ({ options, selectedValue, onSelect }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex justify-between p-2 text-left bg-white border border-placeholderText rounded-[2px] focus:outline-none sm:min-w-40 text-sm"
      >
        <span className="flex items-center justify-between w-full">
          <span>{selectedValue}</span>
          <span>▼</span>
        </span>



      </button>
      {open && (
        <div className="absolute top-full left-0 bg-white border border-placeholderText rounded-[2px] z-50 w-full max-w-52">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 cursor-pointer hover:bg-dropdown"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
