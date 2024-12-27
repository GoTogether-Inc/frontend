import React from 'react';
import { flexCenter } from '../../styles/flex';

interface IconTextProps {
  size?: 'small' | 'medium' | 'large';
  iconPath: string; // 아이콘 이미지 경로
  children: string;
}

const IconButton = ({ size = 'medium', iconPath, children }: IconTextProps) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <button className={`${flexCenter} ${sizeClasses[size]}`}>
      <img src={iconPath} alt="icon" className="w-1/2 h-1/2 mr-2" />
      <span className="text-left not-italic">{children}</span>
    </button>
  );
};

export default IconButton;
