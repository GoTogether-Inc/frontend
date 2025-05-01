import { useParams } from 'react-router-dom';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import SelectTicketInfo from './SelectTicketInfo';
import { useTickets } from '../../../features/ticket/hooks/useTicketHook';
import { useEmailStore } from '../../../features/dashboard/model/EmailStore';
import { ParticipantData } from '../../../features/dashboard/model/participantInformation';

interface SelectTicketModalProps {
  onClose: () => void;
  openEmailModal?: () => void;
  participants: ParticipantData[];
}

const SelectTicketModal = ({ onClose, openEmailModal,participants }: SelectTicketModalProps) => {
  const { id } = useParams();
  const eventId = id ? parseInt(id) : 0;
  const {data, isLoading} = useTickets(eventId);
  const tickets = data?.result ?? [];
  const { setRecipients } = useEmailStore();

  const handleClick = (ticketName: string) => {
    if (!participants || participants.length === 0) {
      alert('구매자가 없습니다.');
      return;
    }
  
    const filteredEmails = participants
      .filter(p => p.ticketName === ticketName)
      .map(p => p.email);

    setRecipients([...new Set(filteredEmails)]); 
    onClose();
    openEmailModal?.();
  };
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
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          tickets.map((ticket) => (
            <SelectTicketInfo
              key={ticket.ticketId} 
              tickets={ticket}
              onClick={() => {
                handleClick(ticket.ticketName); 
                openEmailModal?.(); 
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default SelectTicketModal;
