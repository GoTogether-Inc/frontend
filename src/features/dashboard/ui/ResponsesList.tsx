import { useEffect } from 'react';
import { participantsInfo } from '../../../shared/types/participantInfoType';
import { useParticipantStore } from '../model/ParticipantStore';

interface ResponsesListProps {
  listType: 'summary' | 'query' | 'individual';
  selectedFilter: string[];
}

const ResponsesList = ({ listType, selectedFilter = [] }: ResponsesListProps) => {
  const { all, participants, initializeParticipants, toggleAll, toggleParticipant } = useParticipantStore();

  useEffect(() => {
    initializeParticipants(participantsInfo);
  }, [initializeParticipants]);

  const filteredParticipants = participantsInfo.filter(participant => {
    if (listType === 'query' && !participant.approved) return false;
    if (listType === 'individual' && participant.approved) return false;

    if (selectedFilter.length === 0 || selectedFilter.includes('전체')) return true;
    if (selectedFilter.includes('체크인 완료') && participant.checkIn) return true;
    if (selectedFilter.includes('체크인 전') && !participant.checkIn) return true;

    return false;
  });

  useEffect(() => {
    initializeParticipants(participantsInfo);
  }, [participantsInfo, initializeParticipants]);

  return (
    <div>
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            <div className="flex justify-between text-xs bg-white  px-2 md:px-3 py-3 ">
                <p>이름</p>
                <p>응답 {filteredParticipants.length}개</p>
            </div>
            {filteredParticipants.length === 0 ? (
                <p>응답이 없습니다.</p>
            ) : (
                filteredParticipants.map(participant => (
                    <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={participant.ticketNum}>
                        <p>{participant.name}</p>
                    </div>
                ))
            )}
        </div>
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            <div className="flex justify-between text-xs bg-white  px-2 md:px-3 py-3 ">
                <p>전화번호</p>
                <p>응답 {filteredParticipants.length}개</p>
            </div>
            {filteredParticipants.length === 0 ? (
                <p>응답이 없습니다.</p>
            ) : (
                filteredParticipants.map(participant => (
                    <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={participant.ticketNum}>
                        <p>{participant.phone}</p>
                    </div>
                ))
            )}
        </div>
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            <div className="flex justify-between text-xs bg-white  px-2 md:px-3 py-3 ">
                <p>이메일</p>
                <p>응답 {filteredParticipants.length}개</p>
            </div>
            {filteredParticipants.length === 0 ? (
                <p>응답이 없습니다.</p>
            ) : (
                filteredParticipants.map(participant => (
                    <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={participant.ticketNum}>
                        <p>{participant.email}</p>
                    </div>
                ))
            )}
        </div>
    </div>
    
  );
};
export default ResponsesList;
