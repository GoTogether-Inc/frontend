import React, { useState } from 'react';
import { flexColumnCenter } from '../../styles/flex';

type CardButtonProps = {
  iconPath: string;
  hoverIconPath: string;
  label: string;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export default function VerticalCardButton({
  onClick,
  iconPath,
  hoverIconPath,
  label = '',
  className,
  size = 'medium',
}: CardButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 크기에 따라 스타일 정의
  const sizeClasses = {
    small: 'w-16 h-16 text-[10px]',
    medium: 'w-20 h-20 text-xs',
    large: 'w-24 h-24 text-sm',
  };

  const iconSizeClasses = {
    small: 'w-5',
    medium: 'w-6',
    large: 'w-8',
  };

  return (
    <button
      className={`
        ${flexColumnCenter}
        rounded-default font-bold ${sizeClasses[size]} ${className}
        hover:text-main
      `}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className={`${iconSizeClasses[size]} mb-1`} src={isHovered ? hoverIconPath : iconPath} alt={label} />
      <p>{label}</p>
    </button>
  );
}
