import { useParams } from 'react-router-dom';
import TextButton from '../../../../../design-system/ui/buttons/TextButton';
import SelectTicketInfo from '../ticket/SelectTicketInfo';
import { useTickets } from '../../../../features/ticket/hooks/useTicketHook';
import { useResponseStore } from '../../../../features/dashboard/model/store/ResponseStore';

interface ResponesModalProps {
  onClose: () => void;
}

const ResponesModal = ({ onClose }: ResponesModalProps) => {
  const { id } = useParams();
  const eventId = id ? parseInt(id) : 0;

  const { data, isLoading } = useTickets(eventId);
  const tickets = data?.result ?? [];

  const { setSelectedTicketId } = useResponseStore();

  const handleClick = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    console.log(ticketId)
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-30 z-50">
      <div className="flex flex-col w-[95%] px-4 py-6 gap-3 rounded-[5px] bg-white">
        <div className="flex gap-3 mb-2">
          <TextButton
            label="<"
            onClick={() => {
              onClose();
            }}
          />
          <h1 className="font-bold text-lg">응답을 확인할 티켓을 선택하세요</h1>
        </div>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          tickets.map(ticket => (
            <SelectTicketInfo
              key={ticket.ticketId}
              tickets={ticket}
              onClick={() => {
                handleClick(ticket.ticketId);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default ResponesModal;
