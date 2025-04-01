import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import TicketLogo from '../../../../public/assets/menu/TicketLogo.svg';
import { useEffect, useState } from 'react';
import QrModal from '../../../../design-system/ui/modals/QrModal';
import QRbackground from '../../../../design-system/icons/QRbackground.svg';
import QRcode from '../../../../design-system/icons/QrCode.svg';
import EventCard from '../../../shared/ui/EventCard';
import { readMyTickets } from '../../../features/ticket/api/order';
import completedImg from '../../../../public/assets/menu/Completed.svg';
import pendingImg from '../../../../public/assets/menu/Pending.svg';
import ticketImg from '../../../../public/assets/menu/Ticket.svg';

type Ticket = {
  id: number;
  eventId: number;
  bannerImageUrl: string;
  title: string;
  hostChannelName: string;
  address: string;
  startDate: string;
  ticketName: string;
  orderStatus: "COMPLETED" | "PENDING" | "CANCELED";
  remainDays: "진행중" | "D-1" | "D-7" | "false";
  ticketPrice: number;
  ticketQrCode: string;
  checkIn: boolean;
  hashtags: [];
};

const MyTicketPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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
            location={ticket.address}
            hashtags={ticket.hashtags}
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

      {isModalOpen && selectedTicket &&(
        <div className="fixed top-0 left-0 w-full h-full z-20">
          <div className="relative mx-auto w-full max-w-lg bg-black bg-opacity-30">
            <QrModal
              isChecked={true}
              iconPath1={<img src={QRbackground} alt="QRbackground" />}
              iconPath2={<img src={QRcode} alt="QRcode" />}
              title={selectedTicket.title}
              hostName={selectedTicket.hostChannelName}
              date={selectedTicket.startDate}
              location={selectedTicket.address}
              ticketName={selectedTicket.ticketName}
              price={selectedTicket.ticketPrice}
              orderStatus={selectedTicket.orderStatus}
              isCheckIn={selectedTicket.checkIn}
              isCountdownChecked={true}
              remainDays={selectedTicket.remainDays}
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </TicketHostLayout>
  );
};
export default MyTicketPage;
