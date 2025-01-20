import React, { ReactNode } from 'react';

interface TextButtonProps {
  label: ReactNode;
  onClick: () => void;
  className?: string;
}

const TextButton = ({ label, onClick, className }: TextButtonProps) => {
  return (
    <button
      className={`text-base font-semibold transition hover:underline cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TextButton;
