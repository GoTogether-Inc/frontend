import React from 'react';

interface TextModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const TextModal = ({ isOpen, children, onClick }: TextModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-6 min-w-[200px] text-center">
        {children}
        <button
          className="mt-2 px-4 py-1 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] text-white rounded"
          onClick={onClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default TextModal;