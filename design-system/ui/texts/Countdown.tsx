import React from 'react';
import { flexCenter } from '../../styles/flex';

interface CountdownProps {
  children: React.ReactNode; // 버튼 내부 컨텐츠
  isChecked: boolean; // 활성화 여부
}

const Countdown = ({ children, isChecked }: CountdownProps) => {
  // Active와 Inactive 스타일 분기
  const activeStyles = `
    border-deDayText text-deDayText bg-deDayBg
  `;

  const inactiveStyles = `
    border-deDayTextDark text-deDayTextDark bg-deDayBgLight
  `;

  const baseStyles = `
    h-5 sm:h-4 md:h-5 w-12 px-2 py-1 rounded-[2px] text-11 
    border-[0.1px] font-medium ${flexCenter} 
  `;

  const isEnded = children === 'false';
  const displayText = isEnded ? '종료' : children;

  return <button className={`${baseStyles} ${isChecked && !isEnded ? activeStyles : inactiveStyles}`}>{displayText}</button>
};

export default Countdown;
