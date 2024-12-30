import React, { ChangeEvent, forwardRef } from 'react';
import { flexCenter } from '../../styles/flex';

interface LinkTextFieldProps {
  value?: string;
  iconPath?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onRemoveClick?: () => void;
  category?: 'title' | 'url';
  placeholder?: string;
  className?: string;
}

const LinkTextField = forwardRef<HTMLInputElement, LinkTextFieldProps>(
  (
    {
      value,
      iconPath,
      onClick,
      onChange,
      onRemoveClick,
      category = 'title',
      placeholder = '',
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`group ${flexCenter} ${className}`}>
        {category === 'title' && <img src={iconPath} alt="icon" className="p-2" />}
        <div className="relative w-full">
          <input
            ref={ref}
            type="text"
            value={value}
            onClick={onClick}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
            className={`h-8 text-black placeholder:text-placeholderText outline-none rounded-[3px] px-2 bg-white group-hover:bg-gray3 hover:bg-gray3 focus:bg-gray3 ${
              category === 'title' ? 'w-24' : 'w-72'
            } ml-1`}
          />
          {onRemoveClick && category === 'url' && (
            <button
              type="button"
              onClick={onRemoveClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block focus:hidden"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);
export default LinkTextField;
