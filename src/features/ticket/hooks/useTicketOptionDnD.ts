import { DropResult } from '@hello-pangea/dnd';
import {
  useAttachTicketOptionMutation,
  useDeleteTicketOptionMutation,
  useDetachTicketOptionMutation,
} from './useTicketOptionHook';

export const useTicketOptionDnD = () => {
  const { mutate: attachOption } = useAttachTicketOptionMutation();
  const { mutate: detachOption } = useDetachTicketOptionMutation();
  const { mutate: deleteOption } = useDeleteTicketOptionMutation();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // 드롭이 유효하지 않은 경우
    if (!destination) return;

    // 같은 위치로 드래그한 경우
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'options') return;
      if (source.droppableId.startsWith('ticket-')) {
        // 티켓 내에서 순서 변경 등은 프론트 상태 관리에서 처리 필요 (현재는 무시)
        return;
      }
    }

    // 옵션 영역에서 티켓 영역으로 드래그
    if (source.droppableId === 'options' && destination.droppableId.startsWith('ticket-')) {
      const ticketId = parseInt(destination.droppableId.replace('ticket-', ''), 10);
      const ticketOptionId = parseInt(result.draggableId, 10);

      if (!isNaN(ticketId) || !isNaN(ticketOptionId)) {
        attachOption({ ticketId, ticketOptionId });
      }
      return;
    }

    // 티켓 영역에서 옵션 영역으로 드래그
    if (source.droppableId.startsWith('ticket-') && destination.droppableId === 'options') {
      const ticketId = parseInt(source.droppableId.replace('ticket-', ''), 10);
      const ticketOptionIdStr = result.draggableId.split('-').pop();
      const ticketOptionId = ticketOptionIdStr ? parseInt(ticketOptionIdStr, 10) : undefined;

      if (ticketId && ticketOptionId !== undefined) {
        detachOption({ ticketId, ticketOptionId });
      }
      return;
    }

    // 옵션 영역에서 자체 옵션 삭제 (모든 티켓에서 제거)
    if (source.droppableId === 'options' && destination.droppableId === 'delete') {
      const ticketOptionId = parseInt(result.draggableId, 10);
      if (!isNaN(ticketOptionId)) {
        deleteOption(ticketOptionId);
      }
      return;
    }
  };
  return { onDragEnd };
};
