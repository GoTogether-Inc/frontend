import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PrimaryButtonProps {
  label: string; // 버튼 텍스트
  navigateTo?: string; // 이동할 경로
  disabled?: boolean; // 비활성화 여부
  className?: string; // 추가 스타일링 클래스
  onClick?: () => void; // 클릭 핸들러
  isFullWidth?: boolean; // 버튼 너비를 전체로 설정 여부
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  navigateTo,
  disabled = false,
  className = '',
  onClick,
  isFullWidth = false,
}) => {
  const navigate = useNavigate();

  // 기본 클릭 동작
  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
    if (onClick) {
      onClick();
    }
  };

  // 기본 스타일
  const baseStyles = `
    h-14 sm:h-12 md:h-14 lg:h-14 w-full py-2 px-4 text-white font-semibold transition text-base sm:text-xs md:text-sm lg:text-base 
    rounded-[150px] 
    ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-mainDark'} 
    ${isFullWidth ? 'w-full' : ''}`;

  return (
    <button className={`${baseStyles} ${className}`} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default PrimaryButton;
