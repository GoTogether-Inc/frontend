import React, { ChangeEvent, forwardRef } from 'react';

interface MultilineTextFieldProps {
  label?: string;
  detail?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className: string;
}

const MultilineTextField = forwardRef<HTMLTextAreaElement, MultilineTextFieldProps>(
  ({ label, detail, value, onChange, placeholder = '', className = '', ...rest }, ref) => {
    return (
      <div className={`${className}`}>
        <label className="block px-1 font-semibold text-gray-700 sm:text-base md:text-lg lg:text-lg">{label}</label>
        <label className="block px-1 mb-1 font-medium text-placeholderText sm:text-xs md:text-sm lg:text-sm">
          {detail}
        </label>
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
          className={`w-full h-full border-[0.5px] border-placeholderText rounded-[3px] px-2 py-1 outline-none placeholder:text-placeholderText text-xs font-light resize-none`}
        />
      </div>
    );
  }
);
export default MultilineTextField;
