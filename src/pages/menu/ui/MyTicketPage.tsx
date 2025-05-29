import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import TicketLogo from '../../../../public/assets/menu/TicketLogo.svg';
import { useEffect, useState } from 'react';
import QrModal from '../../../../design-system/ui/modals/QrModal';
import QRbackground from '../../../../design-system/icons/QRbackground.svg';
import EventCard from '../../../shared/ui/EventCard';
import completedImg from '../../../../public/assets/menu/Completed.svg';
import pendingImg from '../../../../public/assets/menu/Pending.svg';
import ticketImg from '../../../../public/assets/menu/Ticket.svg';
import { useCancelTicket, useTicketOrders } from '../../../features/ticket/hooks/useOrderHook';
import { OrderTicketResponse } from '../../../features/ticket/model/Order';
import EmailDeleteModal from '../../../widgets/dashboard/ui/email/EmailDeleteModal';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import useAuthStore from '../../../app/provider/authStore';

const MyTicketPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<OrderTicketResponse | null>(null);
  const [isCancelMode, setIsCancelMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tickets, setTickets] = useState<OrderTicketResponse[]>([]);

  const { data, isLoading, isError } = useTicketOrders(0, 10);
  const { mutate: cancelTicket } = useCancelTicket();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const handleCancelButtonClick = () => {
    if (isCancelMode) {
      if (selectedIds.length === 0) {
        setIsCancelMode(false);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const invalidTickets = tickets.filter(
        ticket => selectedIds.includes(ticket.id) && new Date(ticket.event.startDate) <= today
      );

      if (invalidTickets.length > 0) {
        alert('이미 시작된 이벤트의 티켓은 취소할 수 없습니다.');
        return;
      }

      setIsDeleteModalOpen(true);
    } else {
      setIsCancelMode(true);
    }
  };

  const handelEventCardClick = (ticket: OrderTicketResponse) => {
    if (isCancelMode) {
      setSelectedIds(prev => (prev.includes(ticket.id) ? prev.filter(id => id !== ticket.id) : [...prev, ticket.id]));
    } else {
      setSelectedTicket(ticket);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (data?.result) {
      setTickets(data.result);
    }
  }, [data]);

  return (
    <TicketHostLayout image={TicketLogo} centerContent="내 티켓" ticketPage={true} isCancelMode={isCancelMode}>
      {!isModalOpen && tickets.length > 0 && (
        <div className="flex justify-end mx-6 mt-24">
          <TertiaryButton
            label={isCancelMode ? '선택 완료' : '티켓 취소'}
            type="button"
            color="pink"
            size="small"
            onClick={handleCancelButtonClick}
          />
        </div>
      )}

      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-6 mt-2 md:grid-cols-2 lg:grid-cols-2 pb-4">
        {!isLoggedIn ? (
          <p className="col-span-2 mt-28 text-center text-sm md:text-base text-red-500">
            로그인이 필요한 서비스입니다.
          </p>
        ) : isLoading ? (
          <p className="col-span-2 mt-28 text-center text-sm md:text-base">티켓을 불러오는 중입니다...</p>
        ) : isError ? (
          <p className="col-span-2 mt-28 text-center text-sm md:text-base text-red-500">
            티켓을 불러오는데 실패했습니다.
          </p>
        ) : tickets.length > 0 ? (
          tickets.map(ticket => (
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
              onClick={() => handelEventCardClick}
              className={`transition-transform duration-200 ${
                isCancelMode && selectedIds.includes(ticket.id) ? 'scale-95 border-2 border-pink-400' : ''
              }`}
            >
              <div className="flex items-center text-xs text-gray-500">
                <img src={ticketImg} alt="티켓" className="w-3 h-3 mr-1" />
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
          ))
        ) : (
          <p className="col-span-2 text-center text-sm md:text-base">구매하신 티켓 정보가 없습니다.</p>
        )}
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

      {isDeleteModalOpen && (
        <EmailDeleteModal
          mainText={`총 ${selectedIds.length}개의 티켓을 취소하시겠습니까? 취소 후에는 복구가 불가능합니다.`}
          approveButtonText="티켓 취소"
          rejectButtonText="뒤로가기"
          onClose={() => setIsDeleteModalOpen(false)}
          onClick={() => {
            Promise.all(selectedIds.map(id => cancelTicket(id))).then(() => {
              setTickets(prev => prev.filter(ticket => !selectedIds.includes(ticket.id)));
              setIsDeleteModalOpen(false);
              setIsCancelMode(false);
              setSelectedIds([]);
            });
          }}
        />
      )}
    </TicketHostLayout>
  );
};
export default MyTicketPage;
