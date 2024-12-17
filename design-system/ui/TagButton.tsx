import React from 'react';

interface TagButtonProps {
  children: React.ReactNode; // 버튼 내부 컨텐츠
  isChecked: boolean; // 활성화 여부
  onClick?: () => void; // 클릭 핸들러
}

const TagButton: React.FC<TagButtonProps> = ({ children, isChecked, onClick }) => {
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
    h-10 sm:h-8 md:h-10 lg:h-8 px-4 py-1 rounded-full text-sm sm:text-xs md:text-sm lg:text-base 
    border font-medium transition cursor-pointer flex items-center justify-center
  `;

  return (
    <button className={`${baseStyles} ${isChecked ? activeStyles : inactiveStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default TagButton;
