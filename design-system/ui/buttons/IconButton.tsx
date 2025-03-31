import React from 'react';

export interface IconButtonProps {
  iconPath: React.ReactElement;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'small' | 'medium' | 'large';
  iconClassName?: string;
}

const IconButton = ({ size = 'medium', iconPath, onClick, iconClassName }: IconButtonProps) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
  };

  return (
    <button className={`inline-flex items-center justify-center ${sizeClasses[size]}`} onClick={onClick}>
      <div className={`flex items-center justify-center w-1/2 h-1/2 ${iconClassName}`}>{iconPath}</div>
    </button>
  );
};

export default IconButton;