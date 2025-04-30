import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import EmailInput from '../../../../features/dashboard/ui/EmailInput';
import TimePicker from '../../../../features/event-manage/event-create/ui/TimePicker';
import Button from '../../../../../design-system/ui/Button';
import SelectTicketModal from '../../../../widgets/dashboard/ui/SelectTicketModal';
import { useParticipants } from '../../../../features/dashboard/hook/useParticipants';
import { useEmailStore } from '../../../../features/dashboard/model/EmailStore';
import { useEditEmail } from '../../../../features/dashboard/hook/useEmailHook';
const EmailEditPage = () => {
  const navigate = useNavigate();
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
    reset,
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
    console.log(emailData);

    editEmail({
      reservationEmailId: reservationEmailId, 
      data: emailData,
    },{
      onSuccess: () => {
        reset(); 
        alert("예약 메일이 성공적으로 수정되었습니다!"); 
        navigate(`/dashboard/${id}/mailBox`);
      },
      onError: () => {
        alert("메일 수정에 실패했습니다. 다시 시도해 주세요."); 
      },
    });
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <EmailInput
          type="이메일 내용 수정"
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participants.map((p: { email: any; }) => p.email)}
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
