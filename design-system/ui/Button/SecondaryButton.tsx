import React from 'react';

interface SecondaryButtonProps {
  label: string;
  color: 'pink' | 'black';
  onClick?: () => void;
  className?: string;
}

const SecondaryButton = ({ label, color, onClick, className }: SecondaryButtonProps) => {
  const baseStyle = 'px-4 py-2 font-bold text-white rounded-lg';
  const colorStyle = color === 'pink' ? 'bg-main' : 'bg-black';

  return (
    <button className={`${baseStyle} ${colorStyle} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default SecondaryButton;
