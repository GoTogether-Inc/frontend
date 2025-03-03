import React from 'react';
import Header from '../../../../../design-system/ui/Header';
import Search from '../../../../../design-system/icons/Search.svg';
import { useNavigate } from 'react-router-dom';

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
      <div className="relative bg-gray-100 p-3 min-h-screen flex flex-col gap-3">
        {/* 상단 배너 */}
        <div>
          <div className="shadow-inner flex flex-col justify-center items-center">
            <div className="w-full h-16 bg-gradient-to-r from-main to-gradation text-white font-bold flex items-center px-10 text-xl pt-2">
              구매 확정
            </div>
            <div className="w-full h-3 bg-gradient-to-r from-main to-gradation text-white font-bold clip-top-banner"></div>
          </div>
          <div className="w-full h-3 bg-white clip-bottom-banner"></div>
          <div className="bg-white p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-pink-500 font-bold text-2xl">WOOACON 2024</h2>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">일정</span> 2025년 4월 24일, 14시 20분
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">상품</span> 일반 티켓, 2인
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full border border-gray-300 py-2">상세보기</button>
              <button className="w-full border border-gray-300 py-2">구매 취소</button>
            </div>
          </div>
        </div>

        <div className="bg-white w-full p-5">
          <p className="text-2xl">주최자 정보</p>
          <p>테크 이노베이션 그룹</p>
          <p className="text-gray-400">
            최신 기술 트렌드를 선도하는 테크 이노베이션 그룹입니다. 다양한 기술 컨퍼런스와 워크샵을 주최하고 있습니다.
          </p>
        </div>
      </div>
    </>

    // <>
    //   {' '}
    //   <Header
    //     leftButtonClassName="text-xl hover:no-underline z-30"
    //     leftButtonClick={handlePreviousButton}
    //     leftButtonLabel="<"
    //     centerContent="티켓 구매 확인"
    //     rightContent={<img src={Search} alt="검색" className="w-4" />}
    //   />
    //   <div className="min-h-screen bg-gray-100 flex flex-col gap-10 relative p-3 z-0">
    //     <div className="w-[95%] absolute z-10">
    //       <img src={Layout} alt="ticketConfirmLayout" className="w-full h-full " />
    //     </div>
    //     <div className="z-20">
    //       <div className="bg-yellow-300 h-20">안녕하세요</div>
    //       <div className="bg-slate-600 h-80 opacity-5">안녕하세요</div>
    //     </div>
    //     <div className="bg-white w-full">
    //       <p>주최자 정보</p>
    //       <p>테크 이노베이션 그룹</p>
    //       <p>
    //         최신 기술 트렌드를 선도하는 테크 이노베이션 그룹입니다. 다양한 기술 컨퍼런스와 워크샵을 주최하고 있습니다.
    //       </p>
    //     </div>
    //   </div>
    // </>
  );
};

export default TIcketConfirmPage;
