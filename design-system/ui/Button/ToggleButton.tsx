import React from 'react';

interface ToggleButtonProps {
  isChecked: boolean; // 토글 상태
  onChange: () => void; // 상태 변경 핸들러
  className?: string; // 추가 커스텀 클래스
}

const ToggleButton = ({ isChecked, onChange, className = '' }: ToggleButtonProps) => {
  return (
    <div
      className={`relative w-12 h-6 px-1 flex items-center bg-gray-300 rounded-full cursor-pointer transition ${
        isChecked ? 'bg-main' : 'bg-gray-300'
      } ${className}`}
      onClick={onChange}
    >
      {/* 토글 버튼 내부 원 */}
      <div
        className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
          isChecked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default ToggleButton;
