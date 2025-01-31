interface ButtonProps {
  label: string; // 버튼 텍스트
  onClick: () => void; // 클릭 핸들러
  disabled?: boolean; // 비활성화 여부
  className?: string; // 추가 스타일링 클래스
}

const Button = ({ label, onClick, disabled = false, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 text-white font-semibold transition text-base sm:text-xs md:text-sm lg:text-base
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-mainDark'} 
        ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
