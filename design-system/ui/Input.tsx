import { ChangeEvent, forwardRef } from 'react';

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', value, onChange, placeholder = '', error, className = '', ...rest }, ref) => {
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
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error && <p className="absolute px-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
