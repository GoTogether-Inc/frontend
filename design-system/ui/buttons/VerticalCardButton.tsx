import React, { useState } from 'react';
import { flexColumnCenter } from '../../styles/flex';

interface CardButtonProps {
  iconPath: string;
  hoverIconPath: string;
  label: string;
  onClick: () => void;
  className?: string;
}

export default function VerticalCardButton({
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
        ${flexColumnCenter}
        rounded-default font-bold ${className}
        hover:text-main
        sm:text-xs sm:px-3 sm:h-9
      md:text-sm md:px-3.5 md:h-10
      lg:text-base lg:px-4 lg:h-11
      `}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-4 sm:mb-1 sm:w-5 md:w-6 md:mb-1.5 lg:w-7 lg:mb-2"
        src={isHovered ? hoverIconPath : iconPath}
        alt={label}
      />
      <p>{label}</p>
    </button>
  );
}
