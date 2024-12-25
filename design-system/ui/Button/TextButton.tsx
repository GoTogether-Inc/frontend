import React from 'react';

interface TextButtonProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const TextButton = ({ children, color = '#1D4ED8', onClick }: TextButtonProps) => {
  return (
    <button style={{ color }} className="text-base font-semibold transition hover:underline" onClick={onClick}>
      {children}
    </button>
  );
};

export default TextButton;
