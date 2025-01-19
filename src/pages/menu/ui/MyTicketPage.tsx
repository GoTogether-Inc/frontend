import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import Ticket from '../../../../public/assets/menu/Ticket.svg';
import { useState } from 'react';
import QrModal from '../../../../design-system/ui/modals/QrModal';
import QRbackground from '../../../../design-system/icons/QRbackground.svg';
import QRcode from '../../../../design-system/icons/QRcode.svg';

const MyTicketPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleEventCardClick = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="relative h-screen">
      <TicketHostLayout image={Ticket}>
        <div onClick={handleEventCardClick} className="mb-96">
          이벤트카드
        </div>
        <div onClick={handleEventCardClick} className="mb-96">
          이벤트 카드
        </div>
        <div onClick={handleEventCardClick} className="mb-96">
          이벤트 카드
        </div>
        <div onClick={handleEventCardClick} className="mb-96">
          이벤트 카드
        </div>
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-20">
            <div
              onClick={e => {
                e.stopPropagation();
                handleCloseModal();
              }}
              className="relative mx-auto w-full max-w-lg bg-black bg-opacity-30"
            >
              <QrModal
                isChecked={true}
                iconPath1={<img src={QRbackground} alt="QRbackground" />}
                iconPath2={<img src={QRcode} alt="QRcode" />}
                title="이벤트명"
                hostName="주최명"
                date="2025-01-01"
                location="이벤트 장소"
                ticketName="티켓 이름"
                price={50000}
                isApproved={true}
                isCheckIn={false}
                isCountdownChecked={true}
              />
            </div>
          </div>
        )}
      </TicketHostLayout>
    </div>
  );
};
export default MyTicketPage;
