import React from 'react';
import Countdown from '../texts/Countdown';
import IconText from '../texts/IconText';
import { flexColumnCenter, flexColumn, flexRowSpaceBetweenCenter } from '../../styles/flex';
import qr_calendar from '../../icons/QrCalendar.svg';
import qr_location from '../../icons/QrLocation.svg';
import qr_ticket from '../../icons/QrTicket.svg';
import qr_check from '../../icons/QrCheck.svg';

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
  orderStatus: string; // 티켓 승인 여부
  isCheckIn: boolean; // 참가자 체크인 여부
  isCountdownChecked: boolean;
  remainDays: "진행중" | "D-1" | "D-7" | "false"; //d-day
  onClick: () => void;
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
  orderStatus,
  isCheckIn,
  isCountdownChecked,
  remainDays,

  onClick,
}: QrModalProps) => {
  const formattedPrice = price.toLocaleString();

  // 날짜 포맷 변경
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${flexColumnCenter} h-screen ${className}`}>
      <div>
        {iconPath1 && <div className="w-full">{iconPath1}</div>}
        {iconPath2 && <div className={`ml-[8%] -mt-[176%] ${isChecked ? '' : 'opacity-50'}`}>{iconPath2}</div>}
        <div className={`${flexColumn} justify-start px-6 ${isChecked ? '' : 'opacity-50'}`}>
          <div className={`${flexRowSpaceBetweenCenter} w-full mt-[22%]`}>
            <h1 className="truncate max-w-48 mr-2 font-semibold">{title}</h1>
            <Countdown children={remainDays} isChecked={isCountdownChecked} />
          </div>
          <h2 className="text-deDayTextDark text-xs font-medium mb-2">{hostName}</h2>
          <div className="space-y-1 text-deDayTextDark">
            <IconText
              size="xSmall"
              iconPath={<img src={qr_calendar} alt="qr_calendar" />}
              children={formattedDate}
              className="text-11"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath={<img src={qr_location} alt="qr_location" />}
              children={location}
              className="text-11"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath={<img src={qr_ticket} alt="qr_ticket" />}
              children={ticketName}
              className="text-11"
            ></IconText>
            <span className="text-sm font-bold">{formattedPrice}원</span>
            <hr />
            <IconText
              size="xSmall"
              iconPath={<img src={qr_check} alt="qr_check" />}
              children={orderStatus === 'COMPLETED' ? '승인됨' : '대기 중'}
              className="text-11"
            ></IconText>
            <IconText
              size="xSmall"
              iconPath={<img src={qr_check} alt="qr_check" />}
              children={isCheckIn ? '체크인 완료' : '체크인 미완료'}
              className="text-11"
            ></IconText>
          </div>
        </div>
      </div>
      <span onClick={onClick} className="text-white text-xs mt-6 underline cursor-pointer">
        닫기
      </span>
    </div>
  );
};
export default QrModal;
