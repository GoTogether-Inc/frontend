import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import EmailInput from '../../../../features/dashboard/ui/EmailInput';
import TimePicker from '../../../../features/event/ui/TimePicker';
import Button from '../../../../../design-system/ui/Button';
import SelectTicketModal from '../../../../widgets/dashboard/ui/email/SelectTicketModal';
import { useParticipants } from '../../../../features/dashboard/hook/useParticipants';
import { useEmailStore } from '../../../../features/dashboard/model/store/EmailStore';
import { useEditEmail } from '../../../../features/dashboard/hook/useEmailHook';
import { EmailRequest } from '../../../../features/dashboard/model/emailInformation';
const EmailEditPage = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const { participants } = useParticipants();
  const { id } = useParams();
  const { mutate: editEmail } = useEditEmail();

  const {
    reservationEmailId,
    title,
    content,
    recipients,
    reservationDate,
    setReservationDate,
    ticketId,
    targetType
  } = useEmailStore();

  const handleEdit = () => {
    const eventId = id ? parseInt(id) : 0;
    const emailData: EmailRequest = {
      eventId,
      title,
      content,
      recipients,
      reservationDate,
      targetType
    };
    if (targetType === 'TICKET') {
      emailData.ticketId = ticketId;
    }
    editEmail({ reservationEmailId: reservationEmailId, data: emailData,});
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <EmailInput
          type="이메일 내용 수정"
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participants.map((p: { email: string }) => p.email)}
          isEdited={true}
        />
        {/*시간 선택 컴포넌트*/}
        <TimePicker
          onChange={(isoString) => { setReservationDate(isoString); }}
        />
        <Button label="보내기" onClick={handleEdit} className="w-full h-12 rounded-full" />
      </div>
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};
export default EmailEditPage;
