import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import { useApproveParticipants } from '../hook/useParticipants';
import { ParticipantResponse } from '../model/participantInformation';
import { formatDate, formatTime } from '../../../shared/lib/date';

interface ParticipantCardProps {
  participant: ParticipantResponse;
  checked: boolean;
  onChange: () => void;
  onCheckClick: () => void;
}

const ParticipantCard = ({ participant, onCheckClick }: ParticipantCardProps) => {
  const { mutate: approveParticipant } = useApproveParticipants(participant.orderId);

  return (
    <div className="flex items-center justify-between w-full text-xs bg-white px-2 md:px-3 py-2 shadow-sm">
      <div className="flex gap-2 md:gap-3">
        <div className="flex items-center gap-8 md:gap-20 text-10 md:text-12">
          <p className="ml-3">{participant.orderId}</p>
          <div className="flex flex-col">
            <p>이름: {participant.participant}</p>
            <p>이메일 주소: {participant.email}</p>
            <p>휴대폰 번호: {participant.phoneNumber}</p>
            <div>
              구매 일자: {formatDate(participant.purchaseDate)} {formatTime(participant.purchaseDate)}
            </div>
            <p>티켓 이름: {participant.ticketName}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        {<SecondaryButton label="확인하기" color="pink" size="small" onClick={onCheckClick} />}
        {participant.checkedIn ? (
          <p className="text-[#888686] text-10 md:text-12">완료</p>
        ) : (
          <p className="text-[#888686] text-10 md:text-12">미완료</p>
        )}

        {participant.approved ? (
          <p className="text-[#888686] text-10 md:text-12">승인됨</p>
        ) : participant.ticketType === 'FIRST_COME' ? (
          <p className="text-[#888686] invisible text-10 md:text-12">승인됨</p>
        ) : (
          <TertiaryButton
            label="승인"
            type="button"
            size="small"
            color="pink"
            onClick={() => approveParticipant({ orderId: participant.orderId })}
          />
        )}
      </div>
    </div>
  );
};
export default ParticipantCard;
