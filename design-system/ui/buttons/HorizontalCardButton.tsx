import React, { useState } from 'react';
import { flexRowStart } from '../../styles/flex';

interface CardButtonProps {
  iconPath: string;
  hoverIconPath: string;
  label: string;
  onClick: () => void;
  className?: string;
}

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
      rounded-default font-bold w-full ${className}
      hover:text-main
      sm:text-xs sm:px-3 sm:h-9
      md:text-sm md:px-3.5 md:h-10
      lg:text-base lg:px-4 lg:h-11`}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="mr-4 sm:w-4 sm:mr-3 md:w-4.5 md:mr-3.5 lg:w-5 lg:mr-4"
        src={isHovered ? hoverIconPath : iconPath}
        alt={label}
      />
      <p>{label}</p>
    </button>
  );
}
