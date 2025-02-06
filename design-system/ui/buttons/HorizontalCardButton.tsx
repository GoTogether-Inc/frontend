import React, { useState } from 'react';
import { flexRowStart } from '../../styles/flex';

interface CardButtonProps {
  iconPath: React.ReactElement;
  hoverIconPath?: React.ReactElement;
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
      rounded-default font-bold w-full 
      hover:text-main
      sm:text-sm sm:px-3 sm:h-9
      md:text-base md:px-4 md:h-11
      `}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center justify-center gap-5 ${className}`}>
        {isHovered && hoverIconPath ? hoverIconPath : iconPath}
        <p>{label}</p>
      </div>
    </button>
  );
}
