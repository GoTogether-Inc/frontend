import { useEffect } from 'react';
import Checkbox from '../../../../design-system/ui/Checkbox';
import ParticipantCard from './ParicipantCard';
import { useParticipantStore } from '../model/ParticipantStore';
import { participantsData } from '../../../shared/types/participantInfoType';

interface ParticipantsListProps {
  listType: 'all' | 'approved' | 'pending';
  selectedFilter: string[];
  participants: participantsData[];
}

const ParticipantsList = ({ listType, selectedFilter = [], participants }: ParticipantsListProps) => {
  const {
    all,
    participants: selectedParticipants,
    initializeParticipants,
    toggleAll,
    toggleParticipant,
  } = useParticipantStore();

  useEffect(() => {
    initializeParticipants(participants);
  }, [initializeParticipants]);

  const filteredParticipants = participants.filter(participants => {
    if (listType === 'approved' && !participants.approved) return false;
    if (listType === 'pending' && participants.approved) return false;

    if (selectedFilter.length === 0 || selectedFilter.includes('전체')) return true;
    if (selectedFilter.includes('체크인 완료') && participants.checkIn) return true;
    if (selectedFilter.includes('체크인 전') && !participants.checkIn) return true;

    return false;
  });

  useEffect(() => {
    initializeParticipants(participants);
  }, [participants, initializeParticipants]);

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between text-xs text-[#888686] bg-white shadow-sm px-2 md:px-3 py-3 rounded-t-lg">
        <div className="flex gap-2 md:gap-3">
          <Checkbox checked={all} onChange={toggleAll} label="" />
          <div className="flex items-center gap-15 md:gap-24">
            <p>주문 번호</p>
            <p>참여자 정보</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p>참여자 정보</p>
          <p>체크인</p>
          <p className="mr-1 md:mr-2">승인</p>
        </div>
      </div>
      {filteredParticipants.length === 0 ? (
        <p>참가자 정보가 없습니다.</p>
      ) : (
        filteredParticipants.map(participant => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            checked={selectedParticipants[participant.orderNumber] || false}
            onChange={() => toggleParticipant(participant.orderNumber)}
          />
        ))
      )}
    </div>
  );
};
export default ParticipantsList;
