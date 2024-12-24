// shared/ui/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  label: string; // 체크박스 옆에 표시할 텍스트
  checked: boolean; // 체크 여부
  onChange: () => void; // 상태 변경 핸들러
  disabled?: boolean; // 비활성화 여부
  className?: string; // 추가 스타일링 클래스
}

const Checkbox = ({ label, checked, onChange, disabled = false, className = '' }: CheckboxProps) => {
  return (
    <label
      className={`flex items-center space-x-2 ${
        disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800'
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 
          ${disabled ? 'bg-gray-100' : 'bg-white'} cursor-pointer`}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
