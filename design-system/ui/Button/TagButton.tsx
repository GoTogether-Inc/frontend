import React, { ReactNode } from 'react';

interface TagButtonProps {
  children: ReactNode; // 버튼 텍스트
  isChecked: boolean; // 활성화 여부
  onClick: () => void; // 클릭 핸들러
}

const TagButton = ({ children, isChecked, onClick }: TagButtonProps) => {
  // Active와 Inactive 스타일 분기
  const activeStyles = `
    border-main text-main border-main 
    hover:bg-main hover:text-white
  `;

  const inactiveStyles = `
    bg-white text-gray-700 border-gray-400 
    hover:bg-gray-50 hover:border-gray-500
  `;

  const baseStyles = `
    sm:h-7 sm:px-2 md:h-8 md:px-2.5 lg:h-9 lg:px-3 rounded-full text-sm sm:text-xs md:text-sm lg:text-base 
    border font-medium transition cursor-pointer flex items-center justify-center
  `;

  return (
    <button className={`${baseStyles} ${isChecked ? activeStyles : inactiveStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default TagButton;
