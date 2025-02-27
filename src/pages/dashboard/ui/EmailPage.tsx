import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../design-system/ui/Button';
import TimePicker from '../../../features/event-manage/ui/TimePicker';
import EmailInput from '../../../features/dashboard/ui/EmailInput';
import { participantsInfo } from '../../../shared/types/participantInfoType';
import { useState } from 'react';
import SelectTicketModal from '../../../widgets/dashboard/ui/SelectTicketModal';

const EmailPage = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="p-5 flex flex-col gap-10 min-h-full">
        <EmailInput
          openSelectTicket={() => setTicketModalOpen(true)}
          allParticipantEmails={participantsInfo.map(p => p.email)}
        />
        {/*시간 선택 컴포넌트*/}
        <TimePicker />
        <div className="flex-grow"></div>
        <Button label="보내기" onClick={() => console.log('post 요청')} className="w-full h-12 rounded-full" />
      </div>
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};

export default EmailPage;
