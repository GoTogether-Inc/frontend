import { Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import ModifyPencilIcon from '../../../../public/assets/dashboard/ticket/ModifyPencilIcon.svg';
import DeleteIcon from '../../../../public/assets/dashboard/ticket/DeleteIcon.svg';
import { useTicketOption } from '../../../features/ticket/model/TicketOptionContext';

interface DraggableListProps {
  id: string;
  content: string;
  index: number;
  isDragDisabled?: boolean;
  answerToggled: boolean;
  responseFormat: string;
  droppableId: string;
}

const DraggableList = ({
  id,
  content,
  index,
  isDragDisabled = false,
  answerToggled,
  responseFormat,
  droppableId,
}: DraggableListProps) => {
  const navigate = useNavigate();
  const { selectedOptions, setSelectedOptions } = useTicketOption();

  const handleEditClick = () => {
    navigate('/dashboard/:id/ticket/option/create', {
      state: {
        isEditing: true,
        editOption: {
          id: Number(id),
          content,
          answerToggled,
          responseFormat,
        },
      },
    });
  };

  const handleDelete = () => {
    if (droppableId === 'ticket') {
      setSelectedOptions(prev => prev.filter(opt => String(opt.id) !== id));
    }
  };

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
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
                <div className="flex items-center justify-center">{responseFormat}</div>
              </div>
              <IconButton iconPath={<img src={ModifyPencilIcon} />} onClick={handleEditClick} size="medium" />
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
              <IconButton iconPath={<img className="w-3 h-3" src={DeleteIcon} />} onClick={handleDelete} size="small" />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
