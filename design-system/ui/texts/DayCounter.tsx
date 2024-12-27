import React from 'react';

interface DayCounterProps {
  children: string;
  isChecked: boolean;
  className?: React.ReactNode;
}

const DayCounter = ({ children, isChecked, className }: DayCounterProps) => {
  const activeStyles = `border-deDayText text-deDayText bg-deDayBg`;
  const inactiveStyles = `border-deDayTextDark text-deDayTextDark bg-deDayBgLight`;
  const baseStyles = `h-6 sm:h-4 md:h-6 lg:h-6 px-2 rounded-[2px] text-xs sm:text-xs md:text-xs lg:text-sm 
    border-[0.1px] font-medium`;

  return <div className={`${className} ${baseStyles} ${isChecked ? activeStyles : inactiveStyles}`}>{children}</div>;
};

export default DayCounter;
