import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import TicketLogo from '../../../../public/assets/menu/TicketLogo.svg';
import { useEffect, useState } from 'react';
import QrModal from '../../../../design-system/ui/modals/QrModal';
import QRbackground from '../../../../design-system/icons/QRbackground.svg';
import EventCard from '../../../shared/ui/EventCard';
import { readTicket } from '../../../features/ticket/api/order';
import completedImg from '../../../../public/assets/menu/Completed.svg';
import pendingImg from '../../../../public/assets/menu/Pending.svg';
import ticketImg from '../../../../public/assets/menu/Ticket.svg';
type Ticket = {
  id: number;
  event: {
    id: number;
    bannerImageUrl: string;
    title: string;
    hostChannelName: string;
    address: string;
    startDate: string;
    remainDays: string;
    hashtags: string[];
    onlineType: "ONLINE" | "OFFLINE"; // onlineType 추가
  };
  ticketQrCode: string;
  ticketName: string;
  ticketPrice: number;
  orderStatus: "COMPLETED" | "PENDING" | "CANCELED";
  checkIn: boolean;
};

const MyTicketPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await readTicket.getAll(0, 10);
        setMyTickets(response.result || []);
      } catch (error) {
        console.error("티켓 목록 불러오기 실패:", error);
      }
    };
    fetchMyTickets();
  }, []);

  return (
    <TicketHostLayout image={TicketLogo} centerContent="내 티켓" showText={true}>
      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-6 mt-28 md:grid-cols-2 lg:grid-cols-2 pb-4">
        {myTickets.map((ticket) => (
          <EventCard
            key={ticket.id}
            id={ticket.id}
            img={ticket.event.bannerImageUrl}
            eventTitle={ticket.event.title}
            dDay={ticket.event.remainDays}
            host={ticket.event.hostChannelName}
            eventDate={ticket.event.startDate}
            location={ticket.event.address}
            hashtags={ticket.event.hashtags}
            onClick={() => {
              setSelectedTicket(ticket);
              setIsModalOpen(true);
            }}
          >
            <div className="flex items-center text-xs text-gray-500">
              <img src={ticketImg} alt="날짜" className="w-3 h-3 mr-1" />
              {ticket.ticketName}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <img
                src={ticket.orderStatus === 'COMPLETED' ? completedImg : pendingImg}
                alt={ticket.orderStatus === 'COMPLETED' ? '승인됨' : '대기 중'}
                className="w-3 h-3 mr-1"
              />
              {ticket.orderStatus === 'COMPLETED' ? '승인됨' : '대기 중'}
            </div>

          </EventCard>
        ))}
      </div>

      {isModalOpen && selectedTicket && (
        <div className="fixed top-0 left-0 w-full h-full z-20">
          <div className="relative mx-auto w-full max-w-lg bg-black bg-opacity-30">
            <QrModal
              isChecked={true}
              iconPath1={<img src={QRbackground} alt="QRbackground" />}
              ticketQrCode={selectedTicket.ticketQrCode}
              title={selectedTicket.event.title}
              hostName={selectedTicket.event.hostChannelName}
              date={selectedTicket.event.startDate}
              location={selectedTicket.event.address}
              ticketName={selectedTicket.ticketName}
              price={selectedTicket.ticketPrice}
              orderStatus={selectedTicket.orderStatus}
              isCheckIn={selectedTicket.checkIn}
              isCountdownChecked={true}
              remainDays={selectedTicket.event.remainDays}
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </TicketHostLayout>
  );
};
export default MyTicketPage;
