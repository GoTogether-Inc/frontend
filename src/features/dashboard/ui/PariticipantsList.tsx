import { useEffect, useState } from 'react';
import Checkbox from '../../../../design-system/ui/Checkbox';
import ParticipantCard from './ParicipantCard';
import { useParticipantStore } from '../model/store/ParticipantStore';
import { participantsData } from '../../../shared/types/participantInfoType';
import { usePersonalTicketOptionAnswers } from '../../ticket/hooks/useTicketOptionHook';
import OrderAnswerModal from '../../../widgets/dashboard/ui/response/OrderAnswerModal';

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
    selectedTicketId,
    selectedOrderId,
    setSelectedTicketId,
    setSelectedOrderId
  } = useParticipantStore();

  const { data } = usePersonalTicketOptionAnswers(selectedTicketId);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleCheckClick = (ticketId: number, orderId: number) => {
    setSelectedTicketId(ticketId);
    setSelectedOrderId(orderId);
  };

  useEffect(() => {
    if (!data || !selectedOrderId) {
      setSelectedOrder(null);
      setModalOpen(false);
      return;
    }

    const order = data.result
      .flatMap(user => user.orders)
      .find(order => order.orderId === selectedOrderId);

    if (!order) {
      alert('응답 데이터가 없습니다.');
      setSelectedOrder(null);
      setModalOpen(false);
      return;
    }

    setSelectedOrder(order);
    setModalOpen(true);
  }, [data, selectedOrderId]);

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
            checked={selectedParticipants[participant.orderId] || false}
            onChange={() => toggleParticipant(participant.orderId)}
            onCheckClick={() => handleCheckClick(participant.ticketId, participant.orderId)}
          />
        ))
      )}
      {selectedOrder && (
        <OrderAnswerModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedOrder(null);
            setSelectedTicketId(0);
            setSelectedOrderId(0);
          }}
          order={selectedOrder}
        />
      )}
    </div>
  );
};
export default ParticipantsList;
