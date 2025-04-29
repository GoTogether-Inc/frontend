import React from 'react';
import SearchIcon from '../../../design-system/icons/Search.svg';

interface SearchBarProps {
  className: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, placeholder, value, onChange }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={`w-full h-9 pl-2 pr-10 text-sm bg-white border border-placeholderText rounded-[3px] focus:outline-none`}
      />
      <div className="absolute flex items-center justify-center transform -translate-y-1/2 w-7 h-7 right-2 top-1/2">
        <img src={SearchIcon} alt="Search" />
      </div>
    </div>
  );
};
export default SearchBar;
