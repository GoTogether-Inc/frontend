import React, { ButtonHTMLAttributes, ChangeEvent, forwardRef, ReactElement } from 'react';

type Button = ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;

interface DefaultTextFieldProps {
  label?: string;
  detail?: string;
  value?: string;
  leftText?: string;
  rightContent?: Button;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className: string;
}

const DefaultTextField = forwardRef<HTMLInputElement, DefaultTextFieldProps>(
  ({ label, detail, value, leftText, rightContent, onChange, placeholder = '', className = '', ...rest }, ref) => {
    return (
      <div>
        <label className="block px-1 font-semibold text-gray-700 sm:text-base md:text-lg lg:text-lg">{label}</label>
        <label className="block px-1 mb-1 font-medium text-placeholderText sm:text-10 md:text-sm lg:text-sm">
          {detail}
        </label>
        <div className={`flex items-center justify-center ${className}`}>
          {leftText && <div className="w-20 text-base font-bold whitespace-nowrap">{leftText}</div>}
          <input
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
            className={`w-full h-full border border-placeholderText rounded-[3px] px-2 py-1 outline-none placeholder:text-placeholderText text-xs font-light resize-none`}
          />
          {rightContent && <div className="ml-3">{rightContent}</div>}
        </div>
      </div>
    );
  }
);
export default DefaultTextField;
