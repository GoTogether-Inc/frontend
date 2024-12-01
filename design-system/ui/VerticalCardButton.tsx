import React, { useState } from 'react';
import { flexColumnCenter } from '../styles/flex';

type CardButtonProps = {
  iconPath: string; // 기본 아이콘 경로
  hoverIconPath: string; // hover 시 사용할 아이콘 경로
  label: string;
  onClick: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large'; // 크기 추가
};

export default function VerticalCardButton({
  onClick,
  iconPath,
  hoverIconPath,
  label = '',
  className,
  size = 'medium', // 기본 크기 설정
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
      onMouseEnter={() => setIsHovered(true)} // hover 시작
      onMouseLeave={() => setIsHovered(false)} // hover 종료
    >
      <img
        className={`${iconSizeClasses[size]} mb-1`} // 크기에 따라 아이콘 크기 조정
        src={isHovered ? hoverIconPath : iconPath} // 상태에 따라 아이콘 변경
        alt={label}
      />
      <p>{label}</p>
    </button>
  );
}
