import { useState } from 'react';
import { flexCenter, flexColumn } from '../../styles/flex';

interface ButtonModalProps {
  onApply: (filters: string[]) => void;
  onClose: () => void;
  className?: string;
}

const ButtonModal = ({ onApply, onClose, className = '' }: ButtonModalProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const options = ['전체', '체크인 완료', '체크인 전'];
  const handleSelectOption = (option: string) => {
    if (option === '전체') {
      setSelectedFilter(prev => (prev.length === options.length ? [] : options.slice(0)));
    } else {
      setSelectedFilter(prev => (prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-30 z-30">
      <div className={`w-[95%] space-y-3 px-6 py-5 rounded-[5px] bg-white ${className}`}>
        <h1 className="text-sm text-black font-semibold">티켓 필터</h1>
        <hr />
        <div className={`${flexColumn} space-y-2`}>
          <h2 className="text-sm text-black font-semibold">체크인</h2>
          <div className="flex gap-2.5">
            {options.map(option => (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`${flexCenter} px-3 py-1 mb-6 bg-white text-sm border-[0.3px] rounded-[5px] ${
                  selectedFilter.includes(option)
                    ? 'border-main text-main'
                    : 'border-placeholderText text-placeholderText'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex text-sm font-normal text-black space-x-2">
            <button
              onClick={onClose}
              className="w-full h-7 rounded-[4px] border-[0.3px] border-black hover:bg-main hover:border-main hover:text-white"
            >
              취소
            </button>
            <button
              onClick={() => onApply(selectedFilter)}
              className="w-full h-7 rounded-[4px] border-[0.3px] border-black hover:bg-main hover:border-main hover:text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ButtonModal;
