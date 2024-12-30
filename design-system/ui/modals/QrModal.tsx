import React from 'react';
import Countdown from '../texts/Countdown';
import IconText from '../texts/IconText';
import { flexCenter, flexColumn, flexRowSpaceBetweenCenter } from '../../styles/flex';

interface QrModalProps {
  isChecked: boolean; // QR 상태
  iconPath1?: string; // 모달 배경 이미지
  iconPath2?: string; // QR 이미지
  className?: string;
  title: string; // 이벤트명
  hostName: string; // 주최명
  date: string; // 이벤트 (시작)날짜
  location: string; // 이벤트 장소
  ticketName: string; // 티켓 이름
  price: number; // 티켓 가격
  isApproved: boolean; // 티켓 승인 여부
  isCheckIn: boolean; // 참가자 체크인 여부
  isCountdownChecked: boolean;
}

const QrModal = ({
  isChecked,
  iconPath1,
  iconPath2,
  className,
  title,
  hostName,
  date,
  location,
  ticketName,
  price,
  isApproved,
  isCheckIn,
  isCountdownChecked,
}: QrModalProps) => {
  const formattedPrice = price.toLocaleString();

  // 날짜 포맷 변경
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${flexCenter} w-screen h-screen bg-black bg-opacity-70 ${className}`}>
      <div>
        <img src={iconPath1} alt="QR 배경" className="w-full" />
        <img src={iconPath2} alt="QR코드" className={`mx-auto -mt-[170%] ${isChecked ? '' : 'opacity-50'}`} />
        <div className={`${flexColumn} justify-start px-6 ${isChecked ? '' : 'opacity-50'}`}>
          <div className={`${flexRowSpaceBetweenCenter} w-full mt-[26%]`}>
            <h1 className="truncate max-w-48 mr-2 font-semibold">{title}</h1>
            <Countdown children={`${isCountdownChecked ? 'D-5' : '완료'}`} isChecked={isCountdownChecked} />
          </div>
          <h2 className="text-deDayTextDark text-xs font-medium mb-1">{hostName}</h2>
          <div className="space-y-1 text-deDayTextDark">
            <IconText
              size="xSmall"
              iconPath="../../icons/qr_calendar.svg"
              children={formattedDate}
              className="text-10"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath="../../icons/qr_location.svg"
              children={location}
              className="text-10"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath="../../icons/qr_ticket.svg"
              children={ticketName}
              className="text-10"
            ></IconText>
            <span className="text-sm font-bold">{formattedPrice}원</span>
            <hr />
            <IconText
              size="xSmall"
              iconPath="../../icons/qr_check.svg"
              children={isApproved ? '승인 됨' : '승인 안됨'}
              className="text-10"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath="../../icons/qr_check.svg"
              children={isCheckIn ? '체크인 완료' : '체크인 미완료'}
              className="text-10"
            ></IconText>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QrModal;
