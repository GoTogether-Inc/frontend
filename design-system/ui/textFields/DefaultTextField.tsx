import { ButtonHTMLAttributes, ChangeEvent, forwardRef, ReactElement, KeyboardEvent } from 'react';

type Button = ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;

interface DefaultTextFieldProps {
  label?: string;
  detail?: string;
  value?: string;
  leftText?: string;
  rightContent?: Button;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
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
      placeholder = '',
      className = '',
      labelClassName = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <label className={`block px-1 text-sm font-semibold text-gray-700 ${labelClassName}`}>{label}</label>
        <label className="block px-1 mb-1 font-medium text-placeholderText sm:text-10 md:text-13">{detail}</label>
        <div className={`flex items-center justify-center `}>
          {leftText && <div className="w-20 text-base font-bold whitespace-nowrap">{leftText}</div>}
          <input
            ref={ref}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            {...rest}
            className={`w-full border border-placeholderText rounded-[3px] px-2 py-1 outline-none placeholder:text-placeholderText text-xs font-light resize-none ${className}`}
          />
          {rightContent && <div className="ml-3">{rightContent}</div>}
        </div>
      </div>
    );
  }
);
export default DefaultTextField;
