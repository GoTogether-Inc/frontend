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
      <div
        className={`relative w-5 h-5 flex items-center justify-center border ${
          checked ? 'bg-main border-main' : 'bg-white border-gray-300'
        } ${disabled ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'cursor-pointer border-main'}
        rounded focus-within:ring-2 focus-within:ring-main`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="absolute w-full h-full opacity-0"
        />
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-3 h-3 fill-white">
            <path d="M13.854 4.854a.5.5 0 0 0-.708-.708l-6.396 6.396-2.75-2.75a.5.5 0 0 0-.708.708l3.104 3.104a.5.5 0 0 0 .708 0l6.75-6.75z" />
          </svg>
        )}
      </div>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
