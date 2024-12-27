import React from 'react';

interface DescriptionProps {
  children: string;
  textColor?: string;
  textSize: string;
  className?: string; // 추가 스타일링 클래스
}

export default function Description({
  children,
  textColor = 'text-black',
  textSize,
  className = '',
}: DescriptionProps) {
  return <h2 className={`${textColor} ${textSize} ${className}`}>{children}</h2>;
}
