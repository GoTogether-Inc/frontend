import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import EmailInput from '../../../../features/dashboard/ui/EmailInput';
import { participantsInfo } from '../../../../shared/types/participantInfoType';
import TimePicker from '../../../../features/event-manage/ui/TimePicker';
import Button from '../../../../../design-system/ui/Button';
import SelectTicketModal from '../../../../widgets/dashboard/ui/SelectTicketModal';

const EmailEditPage = () => {
  const navigate = useNavigate();
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="p-5 flex flex-col gap-10 min-h-full">
        <EmailInput
          type="이메일 내용 수정"
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participantsInfo.map(p => p.email)}
        />
        {/*시간 선택 컴포넌트*/}
        <TimePicker />
        <div className="flex-grow"></div>
        <Button label="보내기" onClick={() => navigate('/dashboard/mailBox')} className="w-full h-12 rounded-full" />
      </div>
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};
export default EmailEditPage;
