import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import TicketLogo from '../../../../public/assets/menu/TicketLogo.svg';
import { useEffect, useState } from 'react';
import QrModal from '../../../../design-system/ui/modals/QrModal';
import QRbackground from '../../../../design-system/icons/QRbackground.svg';
import QRcode from '../../../../design-system/icons/QrCode.svg';
import EventCard from '../../../shared/ui/EventCard';
import { readMyTickets } from '../../../features/ticket/api/order';
import completed from '../../../../public/assets/menu/completed.svg';
import pending from  '../../../../public/assets/menu/pending.svg';

type Ticket = {
  id: number;
  eventId: number;
  bannerImageUrl: string;
  title: string;
  hostChannelName: string;
  eventAddress: string;
  startDate: string;
  ticketName: string;
  ticketStatus: "COMPLETED" | "PENDING" | "CANCELED";
  remainDays: string;
};
const MyTicketPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const hash = ["#Tech", "#Innovation"];


  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await readMyTickets.get(0, 10);
        setMyTickets(response.result || []);
      } catch (error) {
        console.error("티켓 목록 불러오기 실패:", error);
      }
    };
    fetchMyTickets();
  }, []);
  useEffect(() => {
    console.log(myTickets);
  }, [myTickets]);


  return (
    <TicketHostLayout image={TicketLogo} centerContent="내 티켓" showText={true}>
      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-6 mt-28 md:grid-cols-2 lg:grid-cols-2 pb-4">
        {myTickets.map((ticket, index) => (
          <EventCard
            key={index}
            img={ticket.bannerImageUrl}
            eventTitle={ticket.title}
            dDay={ticket.remainDays}
            host={ticket.hostChannelName}
            eventDate={ticket.startDate}
            location={ticket.eventAddress}
            hashtags={hash}
            onClick={() => setIsModalOpen(true)}
          >
            <p className="flex items-center text-xs text-gray-500">
              <img
                src={ticket.ticketStatus === 'COMPLETED' ? completed : pending}
                alt={ticket.ticketStatus === 'COMPLETED' ? '승인됨' : '대기 중'}
                className="w-4 h-4 mr-1"
              />
              {ticket.ticketStatus === 'COMPLETED' ? '승인됨' : '대기 중'}
            </p>

          </EventCard>
        ))}
      </div>

      {isModalOpen && (
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
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </TicketHostLayout>
  );
};
export default MyTicketPage;
