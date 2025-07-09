import { useState } from 'react';
import ParticipantsList from '../../../features/dashboard/ui/PariticipantsList';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../shared/ui/SearchBar';
import ButtonModal from '../../../../design-system/ui/modals/ButtonModal';
import ParticipantsFilterBar from '../../../widgets/dashboard/ui/ParticipantsFilterBar';
import EmailModal from '../../../widgets/dashboard/ui/email/EmailModal';
import SelectTicketModal from '../../../widgets/dashboard/ui/email/SelectTicketModal';
import { useParticipants } from '../../../features/dashboard/hook/useParticipants';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import { useParams } from 'react-router-dom';
import { downloadExcel } from '../../../features/dashboard/api/participants';

const ParticipantsManagementPage = () => {
  const [filterModalOpen, setfilterModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [listType, setListType] = useState<'all' | 'approved' | 'pending'>('all');
  const [filter, setFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams(); 
  const eventId = Number(id);

  const { participants } = useParticipants();
  const checkedInCount = participants.filter((p: { checkedIn: boolean; }) => p.checkedIn).length;
  const unapprovedCount = participants.filter((p: { approved: boolean; }) => !p.approved).length;

  const filteredParticipants = participants.filter((p: { participant: string; email: string; phoneNumber: string; ticketId: number; }) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      p.participant?.toLowerCase().includes(lowerSearch) ||
      p.email?.toLowerCase().includes(lowerSearch) ||
      p.phoneNumber?.toLowerCase().includes(lowerSearch) ||
      String(p.ticketId).includes(lowerSearch)
    );
  });
  const exportToExcel = () => {
    try {
    downloadExcel(eventId);
  } catch (error) {
    alert('엑셀 다운로드에 실패했습니다.');
    console.error(error);
  }
  }

  return (
    <DashboardLayout centerContent="DASHBOARD" pinkBg={true}>
      <div className="flex flex-col px-2 md:px-4">
        <h1 className="text-center font-bold text-xl py-4 md:py-6">구매/참가자 관리</h1>

        <div className="flex justify-between items-center px-2">
          {<SecondaryButton label="Excel" color="pink" size="small" onClick={exportToExcel} />}

          <div className="flex items-center gap-2 md:gap-3">
            <h3 className="text-placeholderText text-sm md:text-base">체크인</h3>
            <span className="text-sm md:text-base">{checkedInCount}/{participants.length}</span>
            <span className="text-sm md:text-base">|</span>
            <h3 className="text-placeholderText text-sm md:text-base">미승인</h3>
            <span className="text-sm md:text-base">{unapprovedCount}</span>
          </div>
        </div>

        <SearchBar
          placeholder="이름, 이메일, 전화번호, 티켓ID로 검색"
          className="py-5"
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <ParticipantsFilterBar
          listType={listType}
          setListType={setListType}
          setFilterModalOpen={setfilterModalOpen}
          setEmailModalOpen={setEmailModalOpen}
        />
        <ParticipantsList listType={listType} selectedFilter={filter} participants={filteredParticipants} />
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
            setTicketModalOpen(true);
          }}
          allParticipantEmails={participants.map((p: { email: string }) => p.email)}
        />
      )}
      {ticketModalOpen && <SelectTicketModal onClose={() => setTicketModalOpen(false)} />}
    </DashboardLayout>
  );
};
export default ParticipantsManagementPage;
