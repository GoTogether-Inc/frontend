import { Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import ModifyPencilIcon from '../../../../public/assets/dashboard/ticket/ModifyPencilIcon.svg';
import DeleteIcon from '../../../../public/assets/dashboard/ticket/DeleteIcon.svg';

interface DraggableListProps {
  id: string; // task의 id
  content: string; // task의 content
  index: number; // 드래그앤드롭 위치 추적용
  isDragDisabled?: boolean;
  answerToggled: boolean;
  responseFormat: string;
  droppableId: string;
  onDelete: (id: string) => void;
}

const DraggableList = ({
  id,
  content,
  index,
  isDragDisabled = false,
  answerToggled,
  responseFormat,
  droppableId,
  onDelete,
}: DraggableListProps) => {
  const navigate = useNavigate();

  // 수정 버튼 클릭 시 해당 옵션의 수정 페이지로 이동
  const handleEditClick = () => {
    // localStorage에서 전체 데이터 가져오기
    const savedData = localStorage.getItem('ticketOptions');
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const optionData = parsedData?.options[id];

    navigate('/dashboard/ticket/option/create', {
      state: {
        isEditing: true,
        editOption: {
          id: id,
          content: content,
          answerToggled: answerToggled,
          responseFormat: responseFormat,
          options: optionData?.options || [],
          optionsConfig: optionData?.optionsConfig || [],
        },
      },
    });
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
              <IconButton iconPath={<img className="w-3 h-3" src={DeleteIcon} />} onClick={() => onDelete(id)} size="small" />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
