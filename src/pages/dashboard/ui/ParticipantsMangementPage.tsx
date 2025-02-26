import { useState } from 'react';
import ParticipantsList from '../../../features/dashboard/ui/PariticipantsList';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../shared/ui/SearchBar';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import filterImg from '../../../../public/assets/dashboard/Filter.svg';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import ButtonModal from '../../../../design-system/ui/modals/ButtonModal';

const ParticipantsManagementPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
        <div className="flex itmes-center justify-between text-sm py-2">
          <div className="flex gap-3 font-semibold">
            <TextButton
              label="구매자 목록"
              onClick={() => setListType('all')}
              className={listType === 'all' ? 'text-main' : ''}
            />
            <TextButton
              label="승인된 티켓 목록"
              onClick={() => setListType('approved')}
              className={listType === 'approved' ? 'text-main' : ''}
            />
            <TextButton
              label="미승인된 티켓 목록"
              onClick={() => setListType('pending')}
              className={listType === 'pending' ? 'text-main' : ''}
            />
          </div>
          <div className="flex gap-2">
            <div onClick={() => setModalOpen(true)} className="flex items-center gap-1 text-11 cursor-pointer">
              <p>필터</p>
              <img src={filterImg} alt="필터 아이콘" className="w-3.5" />
            </div>
            <TertiaryButton label="선택 이메일 보내기" color="black" type="button" size="small" />
          </div>
        </div>
        <ParticipantsList listType={listType} selectedFilter={filter} />
      </div>
      {modalOpen && (
        <ButtonModal
          onApply={filters => {
            setFilter(filters);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </DashboardLayout>
  );
};
export default ParticipantsManagementPage;
