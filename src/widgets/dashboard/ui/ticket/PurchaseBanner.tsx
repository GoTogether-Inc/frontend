import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../../../../../public/assets/dashboard/ticket/checkIcon.svg';

interface PurchaseBannerPrpos {
  title: string;
  startDate: string;
  startTime: string;
  ticketName: string;
  quantity: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PurchaseBanner = ({ title,startDate, startTime, ticketName, quantity, setIsModalOpen }: PurchaseBannerPrpos) => {
  const navigate = useNavigate();
  //@TODO:api연동하면서 props 변경

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-14 md:h-16 bg-gradient-to-l from-main to-gradation text-white font-bold flex items-center px-6 text-xl pt-2 gap-2">
          <img src={CheckIcon} alt="Check_Icon" />
          <p>구매 확정</p>
        </div>
        <div className="w-full h-2 md:h-3 bg-gradient-to-l from-main to-gradation clip-top-banner"></div>
      </div>
      <div className="w-full h-3 bg-white clip-bottom-banner"></div>
      <div className="bg-white p-5 flex flex-col gap-5">
        <div>
          <p className="text-pink-500 font-bold md:text-2xl text-xl">{title}</p>
          <p className="text-gray-700 mt-5 flex gap-3">
            <span className="font-semibold text-gray-400">일정</span>
            {startDate}, {startTime}
          </p>
          <p className="text-gray-700 flex gap-3">
            <span className="font-semibold text-gray-400">상품</span>
            {ticketName}, {quantity}인
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <button
            className="w-full border border-gray-300 py-2 md:text-base text-sm"
            onClick={() => navigate('/menu/myticket')}
          >
            상세보기
          </button>
          <button
            className="w-full border border-gray-300 py-2 md:text-base text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            구매 취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBanner;
