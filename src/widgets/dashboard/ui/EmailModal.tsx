import { useParams } from 'react-router-dom';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { useEmailStore } from '../../../features/dashboard/model/EmailStore';
import EmailInput from '../../../features/dashboard/ui/EmailInput';
import { useSendEmail } from '../../../features/dashboard/hook/useEmailHook';
import TimePicker from '../../../features/event-manage/event-create/ui/TimePicker';

interface EmailModalProps {
  onClose: () => void;
  openSelectTicket: () => void;
  allParticipantEmails: string[];
}
const EmailModal = ({ onClose, openSelectTicket, allParticipantEmails }: EmailModalProps) => {
  const { id } = useParams();
  const { mutate: sendEmail } = useSendEmail();

  const {
    title,
    content,
    recipients,
    reservationDate,
    reservationTime,
    setReservationDate,
    setReservationTime,
  } = useEmailStore();

  const handleSend = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (recipients.length === 0) {
      alert('수신자를 한 명 이상 선택해주세요.');
      return;
    }
    if (!reservationDate || !reservationTime) {
      alert('예약 날짜와 시간을 선택해주세요.');
      return;
    }
    const eventId = id ? parseInt(id) : 0;
    const emailData = {
      eventId,
      title,
      content,
      recipients,
      reservationDate,
      reservationTime,
    };
    sendEmail(emailData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-30 z-30">
      <div className="flex flex-col w-[95%] px-4 py-4 gap-7 rounded-[5px] bg-white">
        <EmailInput
          type="선택 이메일 보내기"
          openSelectTicket={openSelectTicket}
          allParticipantEmails={allParticipantEmails}
        />
        <TimePicker
          onTimeChange={(time: string) => setReservationTime(time)}
          onDateChange={(date: string) => setReservationDate(date)}
        />
        <div className="flex justify-end gap-3">
          <TertiaryButton label="취소" type="button" color="black" size="medium" onClick={onClose} />
          <TertiaryButton label="전송" type="button" color="pink" size="medium" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};
export default EmailModal;
