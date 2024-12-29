import React, { ChangeEvent, forwardRef } from 'react';
import { flexCenter } from '../../styles/flex';

interface SearchTextFieldProps {
  value?: string;
  iconPath: string;
  onIconClick?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchTextField = forwardRef<HTMLInputElement, SearchTextFieldProps>(
  ({ value, iconPath, onIconClick, onChange, placeholder = '', className = '', ...rest }, ref) => {
    return (
      <div className={`${flexCenter} ${className}`}>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
          className="w-full sm:h-6 md:h-7 border-[0.3px] border-black rounded-[3px] px-2 outline-none placeholder:text-placeholderText text-xs font-light"
        />
        <img src={iconPath} alt="icon" onClick={onIconClick} className="absolute right-4 cursor-pointer" />
      </div>
    );
  }
);
export default SearchTextField;
