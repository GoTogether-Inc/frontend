import TextButton from '../../../../design-system/ui/buttons/TextButton';
import ticket from '../../../../public/assets/dashboard/participants-management/Ticket.svg';
import { ReadTicketResponse } from '../../../features/ticket/model/ticketInformation';

interface SelectTicketInfoProps {
  tickets: ReadTicketResponse;
  onClick: () => void;
}

const SelectTicketInfo = ({ tickets,onClick}: SelectTicketInfoProps) => {
  return (
    <div className="flex items-center justify-between w-full h-14 bg-white border-[0.5px] border-[#D9D9D9] rounded-[5px]">
      <div className="flex items-center gap-3 ml-4">
        <img src={ticket} alt="티켓 아이콘" />
        <p className="font-bold text-base">{tickets.ticketName}</p>
        <p className="text-14">{tickets.ticketPrice}원</p>
      </div>
      <div className="flex items-center justify-center bg-main w-20 h-14 rounded-r-[5px]">
        <TextButton
          label=">"
          onClick={onClick}
          className="text-white text-xl font-bold"
        />
      </div>
    </div>
  );
};
export default SelectTicketInfo;
