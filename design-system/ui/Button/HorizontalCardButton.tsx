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
      sm:text-sm sm:p-3 sm:rounded-md
      md:text-base md:p-4 md:rounded-lg
      lg:text-lg lg:p-6 lg:rounded-xl`}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className="mr-4 sm:w-4 md:w-5 lg:w-6" src={isHovered ? hoverIconPath : iconPath} alt={label} />
      <p>{label}</p>
    </button>
  );
}
