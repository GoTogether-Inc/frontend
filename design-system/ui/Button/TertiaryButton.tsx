import React from 'react';

interface TertiaryButtonProps {
  label: string;
  color: 'pink' | 'black';
  onClick?: () => void;
  className?: string;
}

const TertiaryButton = ({ label, color, onClick, className }: TertiaryButtonProps) => {
  const baseStyle = 'px-4 py-2 rounded-lg border';
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
