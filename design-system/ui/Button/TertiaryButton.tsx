import React from 'react';

interface TertiaryButtonProps {
  label: string;
  color: 'pink' | 'black';
  onClick?: () => void;
  className?: string;
}

const TertiaryButton = ({ label, color, onClick, className }: TertiaryButtonProps) => {
  const baseStyle = `border
  text-sm sm:px-3 sm:py-2 sm:text-xs sm:rounded
  md:px-3.5 md:py-2.5 md:text-sm md:rounded-md
  lg:px-4 lg:py-2.5 lg:text-base lg:rounded-md`;
  const colorStyle =
    color === 'pink'
      ? 'border-main text-main hover:bg-main hover:text-white hover:font-bold'
      : 'border-black text-black hover:bg-black hover:text-white hover:font-bold';

  return (
    <button className={`${baseStyle} ${colorStyle} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default TertiaryButton;
