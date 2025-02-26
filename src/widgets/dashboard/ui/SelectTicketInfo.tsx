import TextButton from '../../../../design-system/ui/buttons/TextButton';
import ticket from '../../../../public/assets/dashboard/participants-management/Ticket.svg';
import { TicketType } from '../../../shared/types/ticketType';

interface SelectTicketInfoProps {
  tickets: TicketType;
  onClose: () => void;
  openEmailModal: () => void;
}

const SelectTicketInfo = ({ tickets, onClose, openEmailModal }: SelectTicketInfoProps) => {
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
          onClick={() => {
            onClose();
            openEmailModal();
          }}
          className="text-white text-xl font-bold"
        />
      </div>
    </div>
  );
};
export default SelectTicketInfo;
