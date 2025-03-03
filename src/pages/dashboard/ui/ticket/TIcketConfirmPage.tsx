import React from 'react';
import Header from '../../../../../design-system/ui/Header';
import Search from '../../../../../design-system/icons/Search.svg';
import { useNavigate } from 'react-router-dom';
import CallIcon from '../../../../../public/assets/dashboard/ticket/callIcon.svg';
import EmailIcon from '../../../../../public/assets/dashboard/ticket/emailIcon.svg';
import CheckIcon from '../../../../../public/assets/dashboard/ticket/checkIcon.svg';
import KakaoMap from '../../../../features/dashboard/ui/KakaoMap';

const TIcketConfirmPage = () => {
  const navigate = useNavigate();

  const handlePreviousButton = () => {
    navigate(-1);
  };

  return (
    <>
      <Header
        leftButtonClassName="text-xl hover:no-underline z-30"
        leftButtonClick={handlePreviousButton}
        leftButtonLabel="<"
        centerContent="티켓 구매 확인"
        rightContent={<img src={Search} alt="검색" className="w-4" />}
      />
      <div className=" bg-gray-100 p-3 min-h-screen flex flex-col gap-3">
        {/* 상단 배너 */}
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-16 bg-gradient-to-r from-main to-gradation text-white font-bold flex items-center px-10 text-xl pt-2 gap-2">
              <img src={CheckIcon} alt="Check_Icon" />
              <p>구매 확정</p>
            </div>
            <div className="w-full h-3 bg-gradient-to-r from-main to-gradation clip-top-banner"></div>
          </div>
          <div className="w-full h-3 bg-white clip-bottom-banner"></div>
          <div className="bg-white p-5 flex flex-col gap-5">
            <div>
              <p className="text-pink-500 font-bold text-2xl">WOOACON 2024</p>
              <p className="text-gray-700 mt-5 flex gap-3">
                <span className="font-semibold text-gray-400">일정</span>
                2025년 4월 24일, 14시 20분
              </p>
              <p className="text-gray-700 flex gap-3">
                <span className="font-semibold text-gray-400">상품</span>
                일반 티켓, 2인
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full border border-gray-300 py-2">상세보기</button>
              <button className="w-full border border-gray-300 py-2">구매 취소</button>
            </div>
          </div>
        </div>

        <div className="bg-white w-full p-5 flex flex-col gap-3">
          <p className="text-2xl font-bold">주최자 정보</p>
          <p>테크 이노베이션 그룹</p>
          <p className="text-gray-400">
            최신 기술 트렌드를 선도하는 테크 이노베이션 그룹입니다. 다양한 기술 컨퍼런스와 워크샵을 주최하고 있습니다.
          </p>
          <div className="flex gap-3 items-center">
            <img src={CallIcon} alt="Call_Icon" />
            <p className="text-gray-500">02-1234-5678</p>
          </div>
          <div className="flex gap-3 items-center">
            <img src={EmailIcon} alt="Email_Icon" />
            <p className="text-gray-500">aaa@naver.com</p>
          </div>
        </div>
        <div className="p-5 bg-white flex flex-col gap-2">
          <p className="font-bold text-2xl">오시는 길</p>
          <p>서울특별시 강남구 00동</p>

          <KakaoMap />
        </div>
      </div>
    </>
  );
};

export default TIcketConfirmPage;
