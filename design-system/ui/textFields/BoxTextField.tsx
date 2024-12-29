import React, { ChangeEvent, forwardRef } from 'react';

interface BoxTextFieldProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className: string;
}

const BoxTextField = forwardRef<HTMLInputElement, BoxTextFieldProps>(
  ({ value, onChange, placeholder = '', className = '', ...rest }, ref) => {
    return (
      <div className={`${className}`}>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
          className={`w-full border-[0.5px] border-placeholderText rounded-[3px] px-2 py-1 align-top outline-none placeholder:text-placeholderText text-xs font-light ${className}`}
        />
      </div>
    );
  }
);
export default BoxTextField;
