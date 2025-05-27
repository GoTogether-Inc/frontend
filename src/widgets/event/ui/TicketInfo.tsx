import { useEffect, useState } from 'react';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../../../features/ticket/hooks/useTicketHook';
import { useOrderTicket } from '../../../features/ticket/hooks/useOrderHook';
import { readTicketOptions } from '../../../features/ticket/api/ticketOption';

const TicketInfo = ({ eventId }: { eventId: number }) => {
  const limitNum = 4;
  const { data, isError, isLoading } = useTickets(eventId);
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  const { mutate: orderTickets } = useOrderTicket();

  useEffect(() => {
    if (data && data.isSuccess) {
      const initialQuantity: { [key: number]: number } = {};
      data.result.forEach(ticket => {
        initialQuantity[ticket.ticketId] = 1;
      });
      setQuantity(initialQuantity);
    }
  }, [data]);

  const handleIncrement = (ticketId: number) => {
    setQuantity(prev => ({
      ...prev,
      [ticketId]: prev[ticketId] < limitNum ? prev[ticketId] + 1 : prev[ticketId],
    }));
  };

  const handleDecrement = (ticketId: number) => {
    setQuantity(prev => ({
      ...prev,
      [ticketId]: prev[ticketId] > 1 ? prev[ticketId] - 1 : prev[ticketId],
    }));
  };

  // 바로 결제 
  const handleDirectOrder = (
    ticketId: number,
    eventId: number,
    ticketCnt: number
  ) => {
    const ticketInfo = { ticketId, eventId, ticketCnt };
    orderTickets(ticketInfo, {
      onSuccess: (response) => {
        if (response.isSuccess && Array.isArray(response.result)) {
          const orderIds = response.result;
          navigate('/payment/ticket-confirm', {
            state: { orderIds },
          });
        } else {
          alert('주문 정보를 불러올 수 없습니다.');
        }
      },
    });
  };

  // 티켓 옵션 응답 페이지 이동.
  const orderTicket = async (ticketId: number, eventId: number, ticketCnt: number) => {
    try {
      const res = await readTicketOptions(ticketId);
      if (res.isSuccess && res.result.length > 0) {
        const orderInfo = { ticketId, eventId, ticketCnt };
        navigate('/payment/ticket-option-response', { state: orderInfo });
      } else {
        // 옵션 없음 → 바로 결제
        handleDirectOrder(ticketId, eventId, ticketCnt);
      }
    } catch (e) {
      alert('옵션 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data || !data.isSuccess) return <div>티켓 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="w-full h-full">
      {data.result.map(ticket => (
        <div key={ticket.ticketId} className="bg-gray1 px-3 py-3 md:px-6 md:py-4 rounded-[10px] mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 md:gap-4">
                <span className="font-bold text-base md:text-lg">{ticket.ticketName}</span>
                <span className="text-sm md:text-base">{ticket.ticketPrice}원</span>
              </div>
              <div className="flex gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                <span>남은 티켓: {ticket.availableQuantity}장</span>
                <span>|</span>
                <span>1인당 최대: {limitNum}장</span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex gap-1 md:gap-2">
                <TextButton
                  label="-"
                  onClick={() => handleDecrement(ticket.ticketId)}
                  className="flex justify-center items-center bg-white w-6 h-6 md:w-7 md:h-7"
                />
                <span>{quantity[ticket.ticketId]}</span>
                <TextButton
                  label="+"
                  onClick={() => handleIncrement(ticket.ticketId)}
                  className="flex justify-center items-center bg-white w-6 h-6 md:w-7 md:h-7"
                />
              </div>
              <TertiaryButton
                label="구매하기"
                type="button"
                color="black"
                size="large"
                className="w-22 h-8"
                onClick={() => orderTicket(ticket.ticketId, eventId, quantity[ticket.ticketId])}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TicketInfo;
