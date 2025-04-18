import { useState } from 'react';
import TextButton from '../../../../../design-system/ui/buttons/TextButton';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../../shared/ui/SearchBar';
import SentMailCard from '../../../../widgets/dashboard/ui/SentMailCard';
import { mailInfo } from '../../../../shared/types/mailInfoType';
import EmailDeleteMoal from '../../../../widgets/dashboard/ui/EmailDeleteModal';

const MailBoxPage = () => {
  const [listType, setListType] = useState<'completed' | 'pending'>('completed');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();

  const completedMails = mailInfo.filter(mail => new Date(mail.date) < currentDate);
  const pendingMails = mailInfo.filter(mail => new Date(mail.date) > currentDate);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className={`flex flex-col gap-2 mt-8 px-7 ${isModalOpen ? 'blur-sm' : ''}`}>
        <h1 className="w-full text-center font-bold text-xl">보낸 메일함</h1>
        <div className="flex justify-end">
          <SearchBar placeholder="제목 검색" className="w-[35%] my-2" />
        </div>
        <div className="flex gap-3 font-semibold text-15">
          <TextButton
            label="발송 예약 메일"
            onClick={() => setListType('completed')}
            className={listType === 'completed' ? 'text-main' : ''}
          />
          <TextButton
            label="미발송 예약 메일"
            onClick={() => setListType('pending')}
            className={listType === 'pending' ? 'text-main' : ''}
          />
        </div>
        {(listType === 'completed' ? completedMails : pendingMails).map(mail => (
          <SentMailCard
            key={mail.id}
            mail={mail}
            isPending={listType === 'pending' ? true : false}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
      {isModalOpen && (
        <EmailDeleteMoal
          mainText="이메일을 삭제하면 예약이 자동으로 취소됩니다.. 그래도 삭제하시겠습니까?"
          approveButtonText="삭제"
          rejectButtonText="취소"
          onClose={() => setIsModalOpen(false)}
          onClick={() => setIsModalOpen(false)} //임시
        />
      )}
    </DashboardLayout>
  );
};
export default MailBoxPage;
