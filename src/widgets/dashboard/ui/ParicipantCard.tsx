import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import Checkbox from '../../../../design-system/ui/Checkbox';
import { useParticipantStore } from '../../../features/dashboard/model/participantStore';
import { participantsData } from '../../../shared/types/participantInfoType';

interface ParticipantCardProps {
  participant: participantsData;
  checked: boolean;
  checkIn: boolean;
  onChange: () => void;
}

const ParticipantCard = ({ participant, checked, checkIn, onChange }: ParticipantCardProps) => {
  const { approvedParticipants, toggleApproveParticipant } = useParticipantStore();
  return (
    <div className="flex items-center justify-between w-full text-xs bg-white px-3 py-2 shadow-sm">
      <div className="flex gap-3">
        <Checkbox checked={checked} onChange={onChange} label="" />
        <div className="flex items-center gap-6">
          <p>{participant.ticketNum}</p>
          <div className="flex flex-col">
            <p>이름: {participant.name}</p>
            <p>이메일 주소: {participant.email}</p>
            <p>휴대폰 번호: {participant.phone}</p>
            <div>구매 일자: {participant.purchaseDate}</div>
            <p>티켓 이름: {participant.ticketName}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* ver2에서 넣어야 할 버튼
         <SecondaryButton label="확인하기" color="pink" size="small" /> */}
        <p className=" text-[#888686]">{checkIn ? '완료' : '미완료'}</p>

        {approvedParticipants[participant.ticketNum] ? (
          <p className=" text-[#888686]">승인됨</p>
        ) : (
          <TertiaryButton
            label="승인"
            type="button"
            size="small"
            color="pink"
            onClick={() => toggleApproveParticipant(participant.ticketNum)}
          />
        )}
      </div>
    </div>
  );
};
export default ParticipantCard;
