import React, { useState } from 'react';
import { flexColumnCenter } from '../../styles/flex';

interface VerticalCardButtonProps {
  iconPath: string;
  hoverIconPath?: string;
  label: string;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg'; // 크기별 옵션 추가
}

export default function VerticalCardButton({
  onClick,
  iconPath,
  hoverIconPath,
  label = '',
  className = '',
  size = 'md',
}: VerticalCardButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 크기별 스타일 클래스
  const sizeClasses = {
    sm: {
      text: 'text-xs px-2 h-8',
      image: 'sm:w-6 md:w-7 lg:w-8 mb-1',
    },
    md: {
      text: 'text-sm px-3 h-10',
      image: 'sm:w-8 md:w-9 lg:w-10 mb-1.5',
    },
    lg: {
      text: 'sm:text-xs md:text-sm lg:text-base h-12',
      image: 'sm:w-10 md:w-11 lg:w-12 mb-2',
    },
  };

  return (
    <button
      className={`
        ${flexColumnCenter}
        rounded-default ${className}
        hover:text-main
        ${sizeClasses[size].text} /* 크기별 텍스트 및 패딩 */
      `}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className={`${sizeClasses[size].image}`} src={isHovered ? hoverIconPath : iconPath} alt={label} />
      <p>{label}</p>
    </button>
  );
}
