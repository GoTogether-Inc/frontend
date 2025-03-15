import React, { forwardRef } from 'react';

interface MultilineTextFieldProps {
  label?: string;
  detail?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
}

const MultilineTextField = forwardRef<HTMLTextAreaElement, MultilineTextFieldProps>(
  (
    {
      label,
      detail,
      value,
      onChange,
      onKeyDown,
      disabled = false,
      placeholder = '',
      className = '',
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`${className}`}>
        <label className="block px-1 font-semibold text-base lg:text-lg md:mb-2">{label}</label>
        <label className="block px-1 mb-1 font-medium text-placeholderText sm:text-10 md:text-13 lg:text-13">
          {detail}
        </label>
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
          className={`w-full h-full border border-placeholderText rounded-[3px] px-2 py-1 outline-none placeholder:text-placeholderText text-xs font-light resize-none ${
            errorMessage ? 'border-red-500' : ''
          }`}
        />
        {errorMessage && <p className="absolute px-1 text-10 md:text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
export default MultilineTextField;
