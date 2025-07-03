import React from 'react';
import { flexCenter } from '../../styles/flex';

interface CountdownProps {
  children: React.ReactNode; // 버튼 내부 컨텐츠
  isChecked: boolean; // 활성화 여부
  status?: 'PROGRESS' | 'COMPLETE' | 'DELETED'; // 이벤트 상태
}

const Countdown = ({ children, isChecked, status }: CountdownProps) => {
  const baseStyles = `
    h-5 sm:h-4 md:h-5 w-12 px-2 py-1 rounded-[2px] text-11 
    border-[0.1px] font-medium ${flexCenter} 
  `;

  // status 기반 스타일 분기
  const getStyles = () => {
    if (status) {
      switch (status) {
        case 'PROGRESS':
          return `
            border-deDayText text-deDayText bg-deDayBg
          `;
        case 'COMPLETE':
          return `
            border-eventEndText text-eventEndText bg-eventEndBg
          `;
        case 'DELETED':
          return `
            border-deDayTextDark text-deDayTextDark bg-deDayBgLight
          `;
        default:
          return `
            border-deDayText text-deDayText bg-deDayBg
          `;
      }
    }

    // status가 없을 때 기존 로직 (children 기반)
    const isEnded = children === 'false';
    return isChecked && !isEnded
      ? `border-deDayText text-deDayText bg-deDayBg`
      : `border-deDayTextDark text-deDayTextDark bg-deDayBgLight`;
  };

  // status에 따른 displayText 결정
  let displayText: React.ReactNode;
  if (status) {
    switch (status) {
      case 'PROGRESS':
        displayText = '진행중';
        break;
      case 'COMPLETE':
        displayText = '종 료';
        break;
      case 'DELETED':
        displayText = '무 효';
        break;
      default:
        displayText = children;
    }
  } else {
    // status가 없을 때 기존 로직
    const isEnded = children === 'false';
    displayText = isEnded ? '종료' : children;
  }

  return <button className={`${baseStyles} ${getStyles()}`}>{displayText}</button>
};

export default Countdown;
