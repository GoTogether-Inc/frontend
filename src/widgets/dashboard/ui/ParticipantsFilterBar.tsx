import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import filterImg from '../../../../public/assets/dashboard/participants-management/Filter.svg';

interface ParticipantsFilterBarProps {
  listType: 'all' | 'approved' | 'pending';
  setListType: (type: 'all' | 'approved' | 'pending') => void;
  setFilterModalOpen: (open: boolean) => void;
  setEmailModalOpen: (open: boolean) => void;
}

const ParticipantsFilterBar = ({
  listType,
  setListType,
  setFilterModalOpen,
  setEmailModalOpen,
}: ParticipantsFilterBarProps) => {
  return (
    <div className="flex items-center justify-between text-11 md:text-sm py-2">
      <div className="flex gap-1.5 md:gap-3 font-semibold">
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
        <div onClick={() => setFilterModalOpen(true)} className="flex items-center gap-1 text-11 cursor-pointer">
          <p className="text-10 md:text-11">필터</p>
          <img src={filterImg} alt="필터 아이콘" className="w-3 md:w-3.5" />
        </div>
        <TertiaryButton
          label="선택 이메일 보내기"
          color="black"
          type="button"
          size="small"
          onClick={() => setEmailModalOpen(true)}
        />
      </div>
    </div>
  );
};

export default ParticipantsFilterBar;
