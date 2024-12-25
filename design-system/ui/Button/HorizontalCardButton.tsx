import React, { useState } from 'react';
import { flexRowStart } from '../../styles/flex';

type CardButtonProps = {
  iconPath: string; // 기본 아이콘 경로
  hoverIconPath: string; // hover 시 사용할 아이콘 경로
  label: string;
  onClick: () => void;
  className?: string;
};

export default function HorizontalCardButton({
  onClick,
  iconPath,
  hoverIconPath,
  label = '',
  className,
}: CardButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={`
      ${flexRowStart}
      rounded-default font-bold text-base w-full p-5 ${className}
      hover:text-main
      `}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} // hover 시작
      onMouseLeave={() => setIsHovered(false)} // hover 종료
    >
      <img
        className="w-6 mr-4"
        src={isHovered ? hoverIconPath : iconPath} // 상태에 따라 아이콘 변경
        alt={label}
      />
      <p>{label}</p>
    </button>
  );
}
