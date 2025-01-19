import React, { ChangeEvent, forwardRef } from 'react';
import { flexCenter } from '../../styles/flex';

interface SearchTextFieldProps {
  value?: string;
  icon: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchTextField = forwardRef<HTMLInputElement, SearchTextFieldProps>(
  ({ value, icon, onChange, onClick, placeholder = '', className = '', ...rest }, ref) => {
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
        <img src={icon} alt="icon" className="absolute cursor-pointer right-2" />
      </div>
    );
  }
);
export default SearchTextField;
