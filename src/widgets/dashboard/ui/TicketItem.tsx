import AvailableTicket from '../../../../public/assets/dashboard/ticket/Ticket(gray).svg';
import PersonIcon from '../../../../public/assets/dashboard/ticket/PersonIcon.svg';
import { ReadTicket } from '../../../pages/dashboard/ui/ticket/TicketListPage';

const TicketItem = ({ ticket }: { ticket: ReadTicket }) => {
  return (
    <div className="w-full h-14 bg-gray2 my-2 rounded-lg flex items-center justify-between p-5">
      <div className="flex gap-5">
        <p className="font-bold">{ticket.ticketPrice > 0 ? '일반' : '무료'}</p>
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
