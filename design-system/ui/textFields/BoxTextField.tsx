import React, { ChangeEvent, forwardRef } from 'react';

interface BoxTextFieldProps {
  label: string;
  detail?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className: string;
}

const BoxTextField = forwardRef<HTMLInputElement, BoxTextFieldProps>(
  ({ label, detail, value, onChange, placeholder = '', className = '', ...rest }, ref) => {
    return (
      <div>
        <label className="block px-1 font-semibold text-gray-700 sm:text-base md:text-lg lg:text-lg">{label}</label>
        <label className="block px-1 mb-1 font-medium text-placeholderText sm:text-xs md:text-sm lg:text-sm">
          {detail}
        </label>
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
