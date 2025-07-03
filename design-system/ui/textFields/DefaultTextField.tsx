import { ButtonHTMLAttributes, ChangeEvent, forwardRef, ReactElement, KeyboardEvent, FocusEvent } from 'react';

type Button = ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;

interface DefaultTextFieldProps {
  label?: string;
  detail?: string;
  value?: string;
  leftText?: string;
  rightContent?: Button;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  errorPosition?: 'bottom' | 'right';
  className?: string;
  labelClassName?: string;
  detailClassName?: string;
  disabled?: boolean;
  maxLength?: number;
}

const DefaultTextField = forwardRef<HTMLInputElement, DefaultTextFieldProps>(
  (
    {
      label,
      detail,
      value,
      leftText,
      rightContent,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      placeholder = '',
      className = '',
      labelClassName = '',
      errorMessage,
      errorPosition = 'bottom',
      detailClassName = '',
      disabled = false,
      maxLength,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <label className={`block px-1 text-sm font-semibold text-gray-700 ${labelClassName}`}>{label}</label>
        <label className={`block px-1 mb-1 font-medium text-placeholderText sm:text-10 md:text-13 ${detailClassName}`}>
          {detail}
        </label>
        <div className="flex items-center justify-center relative">
          {leftText && <div className="w-24 text-base font-bold whitespace-nowrap">{leftText}</div>}

          <div className="relative w-full">
            <input
              ref={ref}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              {...rest}
              className={`w-full h-11 px-3 py-2 border ${
                errorMessage ? 'border-red-500' : 'border-placeholderText'
              } rounded-[6px] text-sm placeholder:text-placeholderText outline-none ${className}`}
            />
            {errorMessage && errorPosition === 'right' && (
              <p className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-xs text-red-500 whitespace-nowrap">
                {errorMessage}
              </p>
            )}
          </div>

          {rightContent && <div className="ml-3">{rightContent}</div>}
        </div>

        {errorMessage && errorPosition !== 'right' && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
export default DefaultTextField;
