import { useState } from 'react';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { TicketMockData } from '../../../shared/types/ticketType';
import TextButton from '../../../../design-system/ui/buttons/TextButton';

const TicketInfo = () => {
  const limitNum = 4;
  const [quantity, setQuantity] = useState(
    TicketMockData.reduce((acc, ticket) => {
      acc[ticket.eventId] = 1;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleIncrement = (eventId: number) => {
    setQuantity(prev => ({
      ...prev,
      [eventId]: prev[eventId] < limitNum ? prev[eventId] + 1 : prev[eventId],
    }));
  };
  const handleDecrement = (eventId: number) => {
    setQuantity(prev => ({
      ...prev,
      [eventId]: prev[eventId] > 1 ? prev[eventId] - 1 : prev[eventId],
    }));
  };

  return (
    <div className="w-full h-full">
      {TicketMockData.map(ticket => (
        <div key={ticket.eventId} className="bg-gray1 px-3 py-3 md:px-6 md:py-4 rounded-[10px] mb-3">
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
                  onClick={() => handleDecrement(ticket.eventId)}
                  className="flex justify-center items-center bg-white w-6 h-6 md:w-7 md:h-7"
                />
                <span>{quantity[ticket.eventId]}</span>
                <TextButton
                  label="+"
                  onClick={() => handleIncrement(ticket.eventId)}
                  className="flex justify-center items-center bg-white w-6 h-6 md:w-7 md:h-7"
                />
              </div>
              <TertiaryButton label="구매하기" type="button" color="black" className="w-22 h-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TicketInfo;
