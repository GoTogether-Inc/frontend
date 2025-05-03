import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../../design-system/ui/Button';
import TimePicker from '../../../../features/event-manage/event-create/ui/TimePicker';
import EmailInput from '../../../../features/dashboard/ui/EmailInput';
import { useState } from 'react';
import SelectTicketModal from '../../../../widgets/dashboard/ui/SelectTicketModal';
import { useParams } from 'react-router-dom';
import { useParticipants } from '../../../../features/dashboard/hook/useParticipants';
import { useEmailStore } from '../../../../features/dashboard/model/EmailStore';
import { useSendEmail } from '../../../../features/dashboard/hook/useEmailHook';

const EmailPage = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const { participants } = useParticipants();
  const { id } = useParams();
  const { mutate: sendEmail } = useSendEmail();
  
  const {
    title,
    content,
    recipients,
    reservationDate,
    setReservationDate,
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
    if (!reservationDate) {
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
    };
    sendEmail(emailData);
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="p-5 flex flex-col gap-10 min-h-full">
        <EmailInput
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participants.map((p: { email: string; }) => p.email)}
        />
        {/*시간 선택 컴포넌트*/}
        <TimePicker
          onChange={(isoString) => { setReservationDate(isoString); }}
        />
        <div className="flex-grow"></div>
        <Button label="보내기" onClick={handleSend} className="w-full h-12 rounded-full" />
      </div>
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};

export default EmailPage;
