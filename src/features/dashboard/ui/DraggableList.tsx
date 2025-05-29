import { Draggable } from '@hello-pangea/dnd';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import ModifyPencilIcon from '../../../../public/assets/dashboard/ticket/ModifyPencilIcon.svg';
import DeleteIcon from '../../../../public/assets/dashboard/ticket/DeleteIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetachTicketOptionMutation, useDeleteTicketOptionMutation } from '../../ticket/hooks/useTicketOptionHook';

interface DraggableListProps {
  optionId: string;
  content: string;
  index: number;
  isDragDisabled?: boolean;
  answerToggled: boolean;
  responseFormat: string;
  droppableId: string;
  draggableId: string;
  activeButton?: 'modify' | 'delete';
}

const DraggableList = ({
  optionId,
  content,
  index,
  isDragDisabled = false,
  answerToggled,
  responseFormat,
  droppableId,
  draggableId,
  activeButton = 'modify',
}: DraggableListProps) => {
  const { mutate: detachOption } = useDetachTicketOptionMutation();
  const { mutate: deleteOption } = useDeleteTicketOptionMutation();
  const navigate = useNavigate();
  const { id } = useParams();

  const getDisplayFormat = (format: string) => {
    if (format === 'SINGLE') return '객관식';
    if (format === 'MULTIPLE') return '여러개 선택';
    if (format === 'TEXT') return '자유로운 텍스트';
    
    return format;
  };

  // 티켓 옵션 부착 취소
  const handleDetachOption = () => {
    if (droppableId.startsWith('ticket-')) {
      const ticketId = parseInt(droppableId.replace('ticket-', ''), 10);
      const ticketOptionId = Number(optionId);
      detachOption({ ticketId, ticketOptionId });
    }
  };

  // 티켓 옵션 수정
  const handleEditClick = () => {
    navigate(`/dashboard/${id}/ticket/option/create/${optionId}`, {
      state: {
        isEditing: true,
      },
    });
  };

  // 티켓 옵션 삭제
  const handleDeleteOption = () => {
    if (droppableId === 'options') {
      const ticketOptionId = Number(optionId);
      deleteOption(ticketOptionId);
    }
  };

  return (
    <Draggable draggableId={draggableId} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`pl-3 rounded border w-full h-[3.5rem] ${snapshot.isDragging ? 'bg-gray-100' : 'bg-white'}`}
        >
          {droppableId === 'options' ? (
            <div className="h-full flex justify-between items-center">
              {content.length > 6 ? content.slice(0, 6) + '...' : content}
              <div className="flex flex-col justify-center items-center h-full text-placeholderText text-13">
                {answerToggled && <div className="flex items-center justify-center">필수응답</div>}
                <div className="flex items-center justify-center">{getDisplayFormat(responseFormat)}</div>
              </div>
              {activeButton === 'modify' && (
                <IconButton iconPath={<img src={ModifyPencilIcon} />} onClick={handleEditClick} size="medium" />
              )}
              {activeButton === 'delete' && (
                <IconButton
                  iconPath={<img className="w-3 h-3" src={DeleteIcon} />}
                  onClick={handleDeleteOption}
                  size="medium"
                />
              )}
            </div>
          ) : (
            <div className="h-full flex flex-row justify-between items-start">
              <div className="h-full flex flex-col justify-center">
                {content.length > 8 ? content.slice(0, 8) + '...' : content}
                <div className="flex flex-row text-placeholderText text-13">
                  {answerToggled && <div className="mr-1">필수응답{responseFormat ? ',' : ''}</div>}
                  {responseFormat}
                </div>
              </div>
              <IconButton
                iconPath={<img className="w-3 h-3" src={DeleteIcon} />}
                onClick={handleDetachOption}
                size="small"
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
