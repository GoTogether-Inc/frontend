import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardRegisterButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex flex-col items-center justify-center w-full max-w-xs h-full border-2 border-dashed border-gray-400 rounded-xl p-6 text-center bg-white"
      onClick={() => navigate('/payment/cardRegister')}
    >
      {/* + 아이콘 */}
      <div className="flex items-center justify-center w-10 h-10 bg-pink-500 text-white text-2xl rounded-full">+</div>
      {/* 텍스트 */}
      <p className="mt-2 text-lg font-semibold text-gray-700">카드 등록</p>
      <p className="mt-1 text-sm text-gray-500">
        계좌를 한번만 등록해놓으면 <br />
        매번 쉽게 결제할 수 있어요!
      </p>
    </button>
  );
};

export default CardRegisterButton;
