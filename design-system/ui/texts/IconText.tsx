import React from 'react';
import { flexRowStart } from '../../styles/flex';

interface IconTextProps {
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  iconPath: string; // 아이콘 이미지 경로
  children: string;
  className?: string;
}

const IconText = ({ size = 'medium', iconPath, children, className }: IconTextProps) => {
  const sizeClasses = {
    xSmall: 'w-5 h-5',
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <button className={`${flexRowStart} ${sizeClasses[size]}`}>
      <img src={iconPath} alt="icon" className="w-ful h-full mr-2" />
      <span className={`text-left whitespace-nowrap ${className}`}>{children}</span>
    </button>
  );
};

export default IconText;
