import { useState } from 'react';
import TextButton from '../../../../../design-system/ui/buttons/TextButton';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../../shared/ui/SearchBar';
import SentMailCard from '../../../../widgets/dashboard/ui/SentMailCard';
import EmailDeleteMoal from '../../../../widgets/dashboard/ui/EmailDeleteModal';
import { useParams } from 'react-router-dom';
import { useReadEmail } from '../../../../features/dashboard/hook/useEmailHook';

const MailBoxPage = () => {
  const { id } = useParams();
  const eventId = id ? parseInt(id) : 0;
  const [listType, setListType] = useState<'completed' | 'pending'>('completed');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const status = listType === 'pending' ? 'PENDING' : 'SENT';
  const { data: emails = [], isLoading } = useReadEmail(eventId,status);

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
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
        emails.map(mail => (
          <SentMailCard
            key={mail.id}
            mail={mail}
            isPending={listType === 'pending' ? true : false}
            setIsModalOpen={setIsModalOpen}
          />
        )))}
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
