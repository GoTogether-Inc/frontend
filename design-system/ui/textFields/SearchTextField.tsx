import React, { ChangeEvent, forwardRef } from 'react';
import { flexCenter } from '../../styles/flex';

interface SearchTextFieldProps {
  value?: string;
  iconPath: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchTextField = forwardRef<HTMLInputElement, SearchTextFieldProps>(
  ({ value, iconPath, onChange, onClick, placeholder = '', className = '', ...rest }, ref) => {
    return (
      <div onClick={onClick} className={`${flexCenter} ${className} relative w-full`}>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
          className="w-full sm:h-6 md:h-7 border-[0.3px] border-black rounded-[3px] px-2 outline-none placeholder:text-placeholderText text-xs font-light"
        />
        <div className="absolute cursor-pointer right-2">{iconPath}</div>
      </div>
    );
  }
);
export default SearchTextField;
