import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import EmailInput from '../../../../features/dashboard/ui/EmailInput';
import TimePicker from '../../../../features/event-manage/event-create/ui/TimePicker';
import Button from '../../../../../design-system/ui/Button';
import SelectTicketModal from '../../../../widgets/dashboard/ui/SelectTicketModal';
import { useParticipants } from '../../../../features/dashboard/hook/useParticipants';
import { useEmailStore } from '../../../../features/dashboard/model/EmailStore';
import { useEditEmail } from '../../../../features/dashboard/hook/useEmailHook';
const EmailEditPage = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const { participants } = useParticipants();
  const { id } = useParams();
  const {mutate: editEmail} = useEditEmail();

  const {
    reservationEmailId,
    title,
    content,
    recipients,
    reservationDate,
    reservationTime,
    setReservationDate,
    setReservationTime,
  } = useEmailStore();

  const handleEdit = () => {
    const eventId = id ? parseInt(id) : 0;
    const emailData = {
      eventId,
      title,
      content,
      recipients,
      reservationDate,
      reservationTime,
    };
    editEmail({ reservationEmailId: reservationEmailId, data: emailData,});
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <EmailInput
          type="이메일 내용 수정"
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participants.map((p: { email: string; }) => p.email)}
          isEdited= {true}
        />
        {/*시간 선택 컴포넌트*/}
        <TimePicker
          onTimeChange={(time: string) => setReservationTime(time)}
          onDateChange={(date: string) => setReservationDate(date)}
        />
        <Button label="보내기" onClick={handleEdit} className="w-full h-12 rounded-full" />
      </div>
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};
export default EmailEditPage;
