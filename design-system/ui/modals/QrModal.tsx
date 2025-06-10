import React from 'react';
import Countdown from '../texts/Countdown';
import IconText from '../texts/IconText';
import { flexColumn, flexRowSpaceBetweenCenter } from '../../styles/flex';
import qr_calendar from '../../icons/QrCalendar.svg';
import qr_location from '../../icons/QrLocation.svg';
import qr_ticket from '../../icons/QrTicket.svg';
import qr_check from '../../../public/assets/menu/completed.svg';
import qr_pending from '../../../public/assets/menu/pending.svg';

interface QrModalProps {
  isChecked: boolean; // QR 상태
  iconPath1?: React.ReactElement; // 모달 배경 이미지
  ticketQrCode: string;
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
  remainDays: string; //d-day
  onClick: () => void;
}

const QrModal = ({
  isChecked,
  iconPath1,
  ticketQrCode,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-[265px] h-[485px]">
        {iconPath1 && <div className="w-full h-full">{iconPath1}</div>}

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-center px-4 py-4">
          <div className="flex items-center justify-center h-1/2 w-full">
            {ticketQrCode ? (
              <img
                src={`data:image/png;base64,${ticketQrCode}`}
                alt="QR Code"
                className="w-60 h-60 "
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center bg-deDayBgLight rounded-md border border-deDayTextDark text-deDayTextDark text-sm text-center px-4">
                주최자의 승인이 완료되면 QR이 발급됩니다.
              </div>
            )}
          </div>
          <div className={`${flexColumn} justify-start items-start h-1/3  w-full p-3 ${isChecked ? '' : 'opacity-50'}`}>
            <div className={`${flexRowSpaceBetweenCenter} w-full `}>
              <h1 className="truncate max-w-36 mr-2 font-semibold">{title}</h1>
              <Countdown children={remainDays} isChecked={isCountdownChecked} />
            </div>
            <h2 className="text-deDayTextDark text-xs font-medium mb-2">{hostName}</h2>
            <div className="space-y-1 text-deDayTextDark">
              <IconText
                size="xSmall"
                iconPath={<img src={qr_calendar} alt="qr_calendar" className='mr-1' />}
                children={formattedDate}
                className="text-11"
              ></IconText>
              <IconText
                size="xSmall"
                iconPath={<img src={qr_location} alt="qr_location" className='mr-1' />}
                children={location}
                className="text-11"
              ></IconText>
              <IconText
                size="xSmall"
                iconPath={<img src={qr_ticket} alt="qr_ticket" className='mr-1' />}
                children={ticketName}
                className="text-11"
              ></IconText>
              <span className="text-sm font-bold">{formattedPrice}원</span>
              <hr />
              <IconText
                size="xSmall"
                iconPath={<img src={orderStatus === 'COMPLETED' ? qr_check : qr_pending} alt="qr_check" className='mr-1' />}
                children={orderStatus === 'COMPLETED' ? '승인됨' : '대기 중'}
                className="text-11"
              ></IconText>
              <IconText
                size="xSmall"
                iconPath={<img src={isCheckIn ? qr_check : qr_pending} alt="qr_check" className='mr-1' />}
                children={isCheckIn ? '체크인 완료' : '체크인 미완료'}
                className="text-11"
              ></IconText>
            </div>
          </div>

          <span onClick={onClick} className="text-deDayTextDark text-xs underline cursor-pointer mt-2">
            닫기
          </span>
        </div>
      </div>
    </div>
  );

};
export default QrModal;
