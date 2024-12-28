import React from 'react';
import { ChangeEvent, forwardRef } from 'react';

interface DefaultTextFieldProps {
  label: string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

const DefaultTextField = forwardRef<HTMLInputElement, DefaultTextFieldProps>(
  ({ label, type = 'text', value, onChange, placeholder = '', errorMessage, className = '', ...rest }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <label className="block px-1 mb-2 font-medium text-gray-700 sm:text-sm md:text-base lg:text-lg">{label}</label>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
          className={`w-full border-b-2 py-3 px-1 font-semibold text-gray-800 bg-transparent sm:text-sm md:text-base lg:text-lg focus:outline-none ${
            errorMessage ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errorMessage && <p className="absolute px-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

export default DefaultTextField;
