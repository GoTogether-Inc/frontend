import React, { useState } from 'react';
import { flexCenter, flexColumn } from '../../styles/flex';

interface ButtonModalProps {
  onClick: () => void;
  onClose: () => void;
  className?: string;
}

const ButtonModal = ({ onClick, onClose, className = '' }: ButtonModalProps) => {
  const [open, setOpen] = useState(false);
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
    <div>
      <button onClick={() => setOpen(true)}>필터</button>
      {!open && (
        <div className={`w-80 h-full space-y-4 px-6 py-5 rounded-[5px] border border-black ${className}`}>
          <h1 className="text-sm text-black font-semibold">티켓 필터</h1>
          <hr />
          <div className={`${flexColumn} space-y-2`}>
            <h2 className="text-sm text-black font-semibold">체크인</h2>
            <div className="flex gap-1">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  className={`${flexCenter} w-full h-7 mb-3 bg-white text-sm border-[0.3px] rounded-[2px] ${
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
                onClick={onClick}
                className="w-full h-7 rounded-[4px] border-[0.3px] border-black hover:bg-main hover:border-main hover:text-white"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ButtonModal;
