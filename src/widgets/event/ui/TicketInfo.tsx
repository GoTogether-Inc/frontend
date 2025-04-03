import { useEffect, useState } from 'react';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import { readTicket } from '../../../features/ticket/api/ticket';
import { ReadTicket } from '../../../pages/dashboard/ui/ticket/TicketListPage';
import { OrderTicketRequest } from '../../../features/ticket/model/OrderCreation';
import { orderTickets } from '../../../features/ticket/api/order';
import { useNavigate } from 'react-router-dom';

const TicketInfo = ({ eventId }: { eventId: number }) => {
  const limitNum = 4;
  const [tickets, setTickets] = useState<ReadTicket[]>([]);
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await readTicket.getAll(eventId);
        if (data.isSuccess && Array.isArray(data.result)) {
          setTickets(data.result);
        } else {
          setTickets([]);
        }
      } catch (error) {
        console.error("티켓 데이터를 불러오는 중 오류 발생:", error);
        setTickets([]);
      }
    };
    fetchTickets();
  }, [eventId]);
  useEffect(() => {
    if (tickets.length > 0) {
      const initialQuantity: { [key: number]: number } = {};
      tickets.forEach(ticket => {
        initialQuantity[ticket.ticketId] = 1;
      });
      setQuantity(initialQuantity);
    }
  }, [tickets]);
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

  // 구매 API 호출
  const orderTicket = async (ticketId: number, eventId: number, ticketCnt: number)=>{
    try {
      const requestData: OrderTicketRequest = {
        ticketId,
        eventId,
        ticketCnt,
      };

      const response = await orderTickets(requestData);
  
      if (response.isSuccess) {
        console.log("티켓 구매 성공:", response);
        alert("티켓 구매가 완료되었습니다!");
        navigate('/payment/ticket-confirm');
      } else {
        console.error("티켓 구매 실패:", response.message);
        alert(`구매 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("티켓 구매 중 오류 발생:", error);
      alert("티켓 구매 중 오류가 발생했습니다.");
    }
  }
  return (
    <div className="w-full h-full">
      {tickets.map(ticket => (
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
              <TertiaryButton label="구매하기" type="button" color="black" size="large" className="w-22 h-8" onClick={() => orderTicket(ticket.ticketId, eventId, quantity[ticket.ticketId])} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TicketInfo;
