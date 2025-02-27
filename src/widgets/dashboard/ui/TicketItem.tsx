import { TicketType } from '../../../shared/types/ticketType';
import AvailableTicket from '../../../../public/assets/dashboard/ticket/Ticket(gray).svg';
import PersonIcon from '../../../../public/assets/dashboard/ticket/PersonIcon.svg';

const TicketItem = ({ ticket }: { ticket: TicketType }) => {
  return (
    <div className="w-full h-14 bg-gray2 my-2 rounded-lg flex items-center justify-between p-5">
      <div className="flex gap-5">
        <p className="font-bold">{ticket.ticketType}</p>
        <p>{ticket.ticketName}</p>
      </div>
      <div className="flex flex-col gap-1 text-gray-400 text-xs">
        <div className="flex gap-1 items-center justify-end">
          <img src={AvailableTicket} /> {ticket.availableQuantity}개 남음
        </div>
        <div className="flex gap-1 items-center justify-end">
          <img src={PersonIcon} /> 1인당 최대 2장
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
