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
      rounded-default font-bold text-base w-full p-5 ${className}
      hover:text-main
      `}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className="w-6 mr-4" src={isHovered ? hoverIconPath : iconPath} alt={label} />
      <p>{label}</p>
    </button>
  );
}
