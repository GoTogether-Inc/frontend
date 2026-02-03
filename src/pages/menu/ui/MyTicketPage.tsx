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
import EmailDeleteModal from '../../../widgets/dashboard/ui/email/EmailDeleteModal';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import useAuthStore from '../../../app/provider/authStore';
import TextModal from '../../../shared/ui/TextModal';
import { OrderTicketResponse } from '../../../features/ticket/model/Order';

const MyTicketPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<OrderTicketResponse | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<OrderTicketResponse | null>(null);
  const [isCancelMode, setIsCancelMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tickets, setTickets] = useState<OrderTicketResponse[]>([]);

  const { data, isLoading, isError } = useTicketOrders(0, 10);
  const { mutate: cancelTicket } = useCancelTicket();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const [isDoneEventModalOpen, setIsDoneEventModalOpen] = useState(false);
  const [eventModalText, setEventModalText] = useState('');

  const handleCancelButtonClick = () => {
    if (isCancelMode) {
      if (selectedIds.length === 0) {
        setIsCancelMode(false);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const invalidTickets = tickets.filter(
        ticket => selectedIds.includes(ticket.orderId) && new Date(ticket.event.startDate) <= today
      );

      if (invalidTickets.length > 0) {
        const titles = invalidTickets.map(ticket => `• ${ticket.event.title}`).join('\n');
        alert(`❗해당 이벤트는 이미 시작되어 취소할 수 없습니다\n\n${titles}`);
        setIsDeleteModalOpen(false);
        setIsCancelMode(false);
        setSelectedIds([]);
        return;
      }

      setIsDeleteModalOpen(true);
    } else {
      setIsCancelMode(true);
    }
  };

  const handleEventCardClick = (ticket: OrderTicketResponse) => {
    if (isCancelMode) {
      setSelectedIds(prev =>
        prev.includes(ticket.orderId) ? prev.filter(id => id !== ticket.orderId) : [...prev, ticket.orderId]
      );
    } else {
      setSelectedTicket(null);
      setPendingTicket(ticket);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (data?.result) {
      setTickets(data.result);
    }
  }, [data]);

  useEffect(() => {
    if (pendingTicket) {
      setSelectedTicket(pendingTicket);
      setPendingTicket(null);
    }
  }, [pendingTicket]);

  useEffect(() => {
    if (selectedTicket) {
      if (selectedTicket.event.status === 'COMPLETE') {
        setEventModalText('이벤트가 종료되었습니다.');
        setIsDoneEventModalOpen(true);
      } else if (selectedTicket.event.status === 'DELETED') {
        setEventModalText('호스트가 이벤트를 삭제했습니다.');
        setIsDoneEventModalOpen(true);
      }
    }
  }, [selectedTicket]);

  return (
    <TicketHostLayout image={TicketLogo} centerContent="내 티켓" ticketPage={true} isCancelMode={isCancelMode}>
      {tickets.length > 0 && (
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
              key={ticket.orderId}
              id={ticket.orderId}
              img={ticket.event.bannerImageUrl}
              eventTitle={ticket.event.title}
              dDay={ticket.event.remainDays}
              host={ticket.event.hostChannelName}
              eventDate={ticket.event.startDate}
              location={ticket.event.address}
              onlineType={ticket.event.onlineType}
              hashtags={ticket.event.hashtags}
              status={ticket.event.status}
              onClick={() => handleEventCardClick(ticket)}
              className={`transition-transform duration-200 ${
                isCancelMode && selectedIds.includes(ticket.orderId) ? 'scale-95 border-2 border-pink-400' : ''
              }`}
              aspectRatio="md:aspect-[3/4.7] sm:aspect-[1/2]"
            >
              <div className="flex items-center text-xs text-gray-500 w-full">
                <img src={ticketImg} alt="티켓" className="w-3 h-3 mr-1" />
                <span className="truncate whitespace-nowrap overflow-hidden">{ticket.ticketName}</span>
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
          <div className="col-span-2 flex items-center justify-center min-h-[200px]">
            <p className="text-center text-sm md:text-base">구매하신 티켓 정보가 없습니다.</p>
          </div>
        )}
      </div>

      {isModalOpen &&
        selectedTicket &&
        selectedTicket.event.status !== 'DELETED' &&
        selectedTicket.event.status !== 'COMPLETE' && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
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
              eventType={selectedTicket.event.onlineType}
              isCheckIn={selectedTicket.checkIn}
              isCountdownChecked={true}
              remainDays={selectedTicket.event.remainDays}
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        )}

      {isDoneEventModalOpen && selectedTicket && (
        <TextModal isOpen={isDoneEventModalOpen} onClick={() => setIsDoneEventModalOpen(false)}>
          {eventModalText}
        </TextModal>
      )}

      {isDeleteModalOpen && (
        <EmailDeleteModal
          mainText={`총 ${selectedIds.length}개의 티켓을 취소하시겠습니까? 취소 후에는 복구가 불가능합니다.`}
          approveButtonText="티켓 취소"
          rejectButtonText="뒤로가기"
          onClose={() => setIsDeleteModalOpen(false)}
          onClick={() => {
            cancelTicket(selectedIds, {
              onSuccess: () => {
                setTickets(prev => prev.filter(ticket => !selectedIds.includes(ticket.orderId)));
                setIsDeleteModalOpen(false);
                setIsCancelMode(false);
                setSelectedIds([]);
              },
              onError: () => {
                alert('티켓 취소에 실패했습니다.');
                setIsDeleteModalOpen(false);
                setIsCancelMode(false);
                setSelectedIds([]);
              },
            });
          }}
        />
      )}
    </TicketHostLayout>
  );
};
export default MyTicketPage;
