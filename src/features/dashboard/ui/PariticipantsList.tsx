import { useEffect } from 'react';
import Checkbox from '../../../../design-system/ui/Checkbox';
import { participantsInfo } from '../../../shared/types/participantInfoType';
import ParticipantCard from '../../../widgets/dashboard/ui/ParicipantCard';
import { useParticipantStore } from '../model/participantStore';

interface ParticipantsListProps {
  listType: 'all' | 'approved' | 'pending';
}

const ParticipantsList = ({ listType }: ParticipantsListProps) => {
  const { all, participants, initializeParticipants, toggleAll, toggleParticipant } = useParticipantStore();

  const filteredParticipants = participantsInfo.filter(participant => {
    if (listType === 'approved') return participant.approved;
    if (listType === 'pending') return !participant.approved;
    return true; // 'all'이면 전체 목록
  });

  useEffect(() => {
    initializeParticipants(participantsInfo.map(p => p.ticketNum));
  }, [participantsInfo, initializeParticipants]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-placeholderText bg-white shadow-sm px-3 py-3 rounded-t-lg">
        <div className="flex gap-3">
          <Checkbox checked={all} onChange={toggleAll} label="" />
          <div className="flex gap-20">
            <p>티켓 번호</p>
            <p>참여자 정보</p>
          </div>
        </div>
        <div className="flex gap-4">
          {/* <p>참여자 정보</p> */}
          <p>체크인</p>
          <p className="mr-2">승인</p>
        </div>
      </div>
      {filteredParticipants.map(participant => (
        <ParticipantCard
          key={participant.ticketNum}
          participant={participant}
          checked={participants[participant.ticketNum] || false}
          onChange={() => toggleParticipant(participant.ticketNum)}
          checkIn={true}
        />
      ))}
    </div>
  );
};
export default ParticipantsList;
