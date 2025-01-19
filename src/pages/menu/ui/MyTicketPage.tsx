import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import TicketLogo from '../../../../public/assets/menu/TicketLogo.svg';
import { useState } from 'react';
import QrModal from '../../../../design-system/ui/modals/QrModal';
import QRbackground from '../../../../design-system/icons/QRbackground.svg';
import QRcode from '../../../../design-system/icons/QRcode.svg';
import { trendingEvents } from '../../../shared/types/eventCardType';
import EventCard from '../../../shared/ui/EventCard';

const MyTicketPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventCardClick = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <TicketHostLayout image={TicketLogo} centerContent="내 티켓">
      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-6 mt-28 md:grid-cols-2 lg:grid-cols-2">
        {trendingEvents.map((event, index) => (
          <EventCard
            key={index}
            img={event.img}
            eventTitle={event.eventTitle}
            dDay={event.dDay}
            host={event.host}
            eventDate={event.eventDate}
            location={event.location}
            hashtags={event.hashtags}
            onClick={handleEventCardClick}
          />
        ))}
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-20">
          <div className="relative mx-auto w-full max-w-lg bg-black bg-opacity-30">
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
              onClick={handleCloseModal}
            />
          </div>
        </div>
      )}
    </TicketHostLayout>
  );
};
export default MyTicketPage;
