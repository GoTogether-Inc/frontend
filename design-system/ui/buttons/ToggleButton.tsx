import React from 'react';

interface ToggleButtonProps {
  isChecked: boolean; // 토글 상태
  onChange: () => void; // 상태 변경 핸들러
  className?: string;
}

const ToggleButton = ({ isChecked, onChange, className = '' }: ToggleButtonProps) => {
  return (
    <div
      className={`relative lg:w-14 lg:h-6 lg:px-1 md:w-12 md:h-5 md:px-1 sm:w-10 sm:h-4 sm:px-1 flex items-center bg-gray-300 rounded-full cursor-pointer transition ${
        isChecked ? 'bg-main' : 'bg-gray-300'
      } ${className}`}
      onClick={onChange}
    >
      {/* 토글 버튼 내부 원 */}
      <div
        className={`absolute lg:w-4 lg:h-4 md:w-3.5 md:h-3.5 sm:w-2.5 sm:h-2.5 bg-white rounded-full transition-transform ${
          isChecked ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default ToggleButton;
