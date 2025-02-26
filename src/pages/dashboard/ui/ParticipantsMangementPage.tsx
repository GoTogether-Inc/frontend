import { useState } from 'react';
import ParticipantsList from '../../../features/dashboard/ui/PariticipantsList';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../shared/ui/SearchBar';
import ButtonModal from '../../../../design-system/ui/modals/ButtonModal';
import ParticipantsFilterBar from '../../../features/dashboard/ui/ParticipantsFilterBar';
import EmailModal from '../../../features/dashboard/ui/EmailModal';

const ParticipantsManagementPage = () => {
  const [filterModalOpen, setfilterModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [listType, setListType] = useState<'all' | 'approved' | 'pending'>('all');
  const [filter, setFilter] = useState<string[]>([]);

  return (
    <DashboardLayout centerContent="WOOACON 2024" pinkBg={true}>
      <div className="flex flex-col px-4">
        <h1 className="text-center font-bold text-xl py-6">구매/참가자 관리</h1>
        <div className="flex justify-end gap-3 px-4">
          <h3 className="text-placeholderText">체크인</h3>
          <span>0/0</span>
          <span>|</span>
          <h3 className="text-placeholderText">미승인</h3>
          <span>0</span>
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
      {emailModalOpen && <EmailModal onClose={() => setEmailModalOpen(false)} />}
    </DashboardLayout>
  );
};
export default ParticipantsManagementPage;
