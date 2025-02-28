import { useState } from 'react';
import TextButton from '../../../../../design-system/ui/buttons/TextButton';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../../shared/ui/SearchBar';
import SentMailCard from '../../../../widgets/dashboard/ui/SentMailCard';
import { mailInfo } from '../../../../shared/types/mailInfoType';

const MailBoxPage = () => {
  const [listType, setListType] = useState<'all' | 'pending'>('all');
  const currentDate = new Date();

  const pendingMails = mailInfo.filter(mail => new Date(mail.date) > currentDate);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-2 mt-8 px-7">
        <h1 className="w-full text-center font-bold text-xl">보낸 메일함</h1>
        <div className="flex justify-end">
          <SearchBar placeholder="제목 검색" className="w-[45%] my-2" />
        </div>
        <div className="flex gap-3 font-semibold text-15">
          <TextButton
            label="모든 메일"
            onClick={() => setListType('all')}
            className={listType === 'all' ? 'text-main' : ''}
          />
          <TextButton
            label="미발송 예약 메일"
            onClick={() => setListType('pending')}
            className={listType === 'pending' ? 'text-main' : ''}
          />
        </div>
        {(listType === 'all' ? mailInfo : pendingMails).map(mail => (
          <SentMailCard key={mail.id} mail={mail} isPending={listType === 'pending' ? true : false} />
        ))}
      </div>
    </DashboardLayout>
  );
};
export default MailBoxPage;
