import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../../design-system/ui/Button';
import TimePicker from '../../../../features/event-manage/event-create/ui/TimePicker';
import EmailInput from '../../../../features/dashboard/ui/EmailInput';
import { useState } from 'react';
import SelectTicketModal from '../../../../widgets/dashboard/ui/SelectTicketModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useParticipants } from '../../../../features/dashboard/hook/useParticipants';
import { useEmailStore } from '../../../../features/dashboard/model/EmailStore';
import { useSendEmail } from '../../../../features/dashboard/hook/useEmailHook';

const EmailPage = () => {
  const navigate = useNavigate();
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const { participants } = useParticipants();
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
    reset,
  } = useEmailStore();

  const handleSend = () => {
    const eventId = id ? parseInt(id) : 0;
    const emailData = {
      eventId,
      title,
      content,
      recipients,
      reservationDate,
      reservationTime,
    };
    console.log(emailData);

    sendEmail(emailData, {
      onSuccess: () => {
        reset(); 
        alert("예약 메일이 성공적으로 발송되었습니다!"); 
        navigate(`/dashboard/${id}/mailBox`);
      },
      onError: () => {
        alert("메일 전송에 실패했습니다. 다시 시도해 주세요."); 
      },
    });
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="p-5 flex flex-col gap-10 min-h-full">
        <EmailInput
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participants.map((p: { email: any; }) => p.email)}
        />
        {/*시간 선택 컴포넌트*/}
        <TimePicker
          onTimeChange={(time: string) => setReservationTime(time)}
          onDateChange={(date: string) => setReservationDate(date)}
        />
        <div className="flex-grow"></div>
        <Button label="보내기" onClick={handleSend} className="w-full h-12 rounded-full" />
      </div>
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};

export default EmailPage;
