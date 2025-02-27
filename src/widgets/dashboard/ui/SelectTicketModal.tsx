import TextButton from '../../../../design-system/ui/buttons/TextButton';
import { TicketMockData } from '../../../shared/types/ticketType';
import SelectTicketInfo from './SelectTicketInfo';

interface SelectTicketModalProps {
  onClose: () => void;
  openEmailModal?: () => void;
}

const SelectTicketModal = ({ onClose, openEmailModal }: SelectTicketModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-30 z-50">
      <div className="flex flex-col w-[95%] px-4 py-6 gap-3 rounded-[5px] bg-white">
        <div className="flex gap-3 mb-2">
          <TextButton
            label="<"
            onClick={() => {
              onClose();
              openEmailModal?.();
            }}
          />
          <h1 className="font-bold text-lg">이메일 발송할 티켓을 선택하세요</h1>
        </div>
        {TicketMockData.map(ticket => (
          <SelectTicketInfo
            key={ticket.eventId}
            tickets={ticket}
            onClose={onClose}
            openEmailModal={openEmailModal ?? (() => {})}
          />
        ))}
      </div>
    </div>
  );
};
export default SelectTicketModal;
