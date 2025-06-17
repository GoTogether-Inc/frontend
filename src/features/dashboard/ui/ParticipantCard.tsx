import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import { useApproveParticipants } from '../hook/useParticipants';
import { ParticipantResponse } from '../model/participantInformation';
import { formatDate, formatTime } from '../../../shared/lib/date';
import { usePersonalTicketOptionAnswers } from '../../ticket/hooks/useTicketOptionHook';

interface ParticipantCardProps {
  participant: ParticipantResponse;
  checked: boolean;
  onChange: () => void;
  onCheckClick: () => void;
}

const ParticipantCard = ({ participant, onCheckClick }: ParticipantCardProps) => {
  const { mutate: approveParticipant } = useApproveParticipants(participant.id);
  // useQuery를 사용한 에러 핸들링
  const { error } = usePersonalTicketOptionAnswers(participant.ticketId);


  // 티켓 옵션 응답 개별 조회 사용 중 -> 올바른 API 수정해야함(에러 핸들링만 처리한 상태)
  const handleCheckClick = () => {
    if (error) {
      alert('응답 데이터가 없습니다.');
      return;
    }
    onCheckClick();
  };

  return (
    <div className="flex items-center justify-between w-full text-xs bg-white px-2 md:px-3 py-2 shadow-sm">
      <div className="flex gap-2 md:gap-3">
        <div className="flex items-center gap-3 md:gap-10 text-10 md:text-12">
          <p className="ml-3">{participant.orderCode}</p>
          <div className="flex flex-col">
            <p>이름: {participant.participant}</p>
            <p>이메일: {participant.email}</p>
            <p>휴대폰 번호: {participant.phoneNumber}</p>
            <div>
              구매 일자: {formatDate(participant.purchaseDate)} {formatTime(participant.purchaseDate)}
            </div>
            <p>티켓 이름: {participant.ticketName}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        {/* 에러 핸들링 여기도 수정해야함 */}
        {<SecondaryButton label="확인하기" color="pink" size="small" onClick={handleCheckClick} />}
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
            onClick={() => approveParticipant({ orderId: participant.id })}
          />
        )}
      </div>
    </div>
  );
};
export default ParticipantCard;
