import React, { useState } from 'react';
import { flexRowStart } from '../../styles/flex';

type CardButtonProps = {
  iconPath: string;
  hoverIconPath: string;
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
      rounded-default font-bold w-full ${className}
      hover:text-main
      sm:text-xs sm:px-3 sm:py-2
      md:text-sm md:px-3.5 md:py-2
      lg:text-base lg:px-4 lg:py-2.5`}
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
