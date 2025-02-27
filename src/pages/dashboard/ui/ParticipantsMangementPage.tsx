import { useState } from 'react';
import ParticipantsList from '../../../features/dashboard/ui/PariticipantsList';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../shared/ui/SearchBar';
import ButtonModal from '../../../../design-system/ui/modals/ButtonModal';
import ParticipantsFilterBar from '../../../widgets/dashboard/ui/ParticipantsFilterBar';
import EmailModal from '../../../widgets/dashboard/ui/EmailModal';
import SelectTicketModal from '../../../widgets/dashboard/ui/SelectTicketModal';
import { participantsInfo } from '../../../shared/types/participantInfoType';

const ParticipantsManagementPage = () => {
  const [filterModalOpen, setfilterModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [listType, setListType] = useState<'all' | 'approved' | 'pending'>('all');
  const [filter, setFilter] = useState<string[]>([]);

  return (
    <DashboardLayout centerContent="WOOACON 2024" pinkBg={true}>
      <div className="flex flex-col px-2 md:px-4">
        <h1 className="text-center font-bold text-xl py-4 md:py-6">구매/참가자 관리</h1>
        <div className="flex justify-end gap-2 md:gap-3 px-4">
          <h3 className="text-placeholderText text-sm md:text-base">체크인</h3>
          <span className="text-sm md:text-base">0/0</span>
          <span className="text-sm md:text-base">|</span>
          <h3 className="text-placeholderText text-sm md:text-base">미승인</h3>
          <span className="text-sm md:text-base">0</span>
        </div>
        <SearchBar placeholder="이름, 이메일, 전화번호, 티켓ID로 검색" className="py-5" />
        <ParticipantsFilterBar
          listType={listType}
          setListType={setListType}
          setFilterModalOpen={setfilterModalOpen}
          setEmailModalOpen={setEmailModalOpen}
        />
        <ParticipantsList listType={listType} selectedFilter={filter} />
      </div>
      {filterModalOpen && (
        <ButtonModal
          onApply={filters => {
            setFilter(filters);
            setfilterModalOpen(false);
          }}
          onClose={() => setfilterModalOpen(false)}
        />
      )}
      {emailModalOpen && (
        <EmailModal
          onClose={() => setEmailModalOpen(false)}
          openSelectTicket={() => {
            setEmailModalOpen(false);
            setTicketModalOpen(true);
          }}
          allParticipantEmails={participantsInfo.map(p => p.email)}
        />
      )}
      {ticketModalOpen && (
        <SelectTicketModal
          onClose={() => setTicketModalOpen(false)}
          openEmailModal={() => {
            setTicketModalOpen(false);
            setEmailModalOpen(true);
          }}
        />
      )}
    </DashboardLayout>
  );
};
export default ParticipantsManagementPage;
