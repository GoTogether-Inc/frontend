import React from 'react';
import CallIcon from '../../../../../public/assets/dashboard/ticket/callIcon.svg';
import EmailIcon from '../../../../../public/assets/dashboard/ticket/emailIcon.svg';

const OrganizerInfo = () => {
  return (
    <div className="bg-white w-full p-5 flex flex-col gap-3">
      <p className="md:text-2xl text-xl font-bold">주최자 정보</p>
      <p>테크 이노베이션 그룹</p>
      <p className="text-gray-400 md:text-base text-sm">
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
  );
};

export default OrganizerInfo;
