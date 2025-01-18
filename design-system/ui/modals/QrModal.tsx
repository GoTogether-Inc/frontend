import React from 'react';
import Countdown from '../texts/Countdown';
import IconText from '../texts/IconText';
import { flexCenter, flexColumn, flexRowSpaceBetweenCenter } from '../../styles/flex';
import qr_calendar from '../../icons/qr_calendar.svg';
import qr_location from '../../icons/qr_location.svg';
import qr_ticket from '../../icons/qr_ticket.svg';
import qr_check from '../../icons/qr_check.svg';

interface QrModalProps {
  isChecked: boolean; // QR 상태
  iconPath1?: React.ReactElement; // 모달 배경 이미지
  iconPath2?: React.ReactElement; // QR 이미지
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
    <div className={`${flexCenter} h-screen bg-black bg-opacity-30 ${className}`}>
      <div>
        {iconPath1 && <div className="w-full">{iconPath1}</div>}
        {iconPath2 && <div className={`ml-[8%] -mt-[173%] ${isChecked ? '' : 'opacity-50'}`}>{iconPath2}</div>}
        <div className={`${flexColumn} justify-start px-6 ${isChecked ? '' : 'opacity-50'}`}>
          <div className={`${flexRowSpaceBetweenCenter} w-full mt-[19.5%]`}>
            <h1 className="truncate max-w-48 mr-2 font-semibold">{title}</h1>
            <Countdown children={`${isCountdownChecked ? 'D-5' : '완료'}`} isChecked={isCountdownChecked} />
          </div>
          <h2 className="text-deDayTextDark text-xs font-medium mb-1">{hostName}</h2>
          <div className="space-y-1 text-deDayTextDark">
            <IconText size="xSmall" iconPath={qr_calendar} children={formattedDate} className="text-10"></IconText>
            <IconText size="xSmall" iconPath={qr_location} children={location} className="text-10"></IconText>
            <IconText size="xSmall" iconPath={qr_ticket} children={ticketName} className="text-10"></IconText>
            <span className="text-sm font-bold">{formattedPrice}원</span>
            <hr />
            <IconText
              size="xSmall"
              iconPath={qr_check}
              children={isApproved ? '승인 됨' : '승인 안됨'}
              className="text-10"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath={qr_check}
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
