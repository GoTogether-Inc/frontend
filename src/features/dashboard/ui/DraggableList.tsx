import { Draggable } from '@hello-pangea/dnd';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import ModifyPencilIcon from '../../../../public/assets/dashboard/ticket/ModifyPencilIcon.svg';

interface DraggableListProps {
  id: string; // task의 id
  content: string; // task의 content
  index: number; // 드래그앤드롭 위치 추적용
  isDragDisabled?: boolean;
  answerToggled: boolean;
  responseFormat: string;
}

const DraggableList = ({
  id,
  content,
  index,
  isDragDisabled = false,
  answerToggled,
  responseFormat,
}: DraggableListProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`pl-2 rounded border w-full h-[3rem] flex justify-between items-center ${
            snapshot.isDragging ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          {content}
          <>
            <div className="flex flex-col justify-center items-center h-full text-placeholderText text-13">
              {answerToggled && <div className="flex items-center justify-center">필수응답</div>}
              <div className="flex items-center justify-center">{responseFormat}</div>
            </div>
          </>
          <IconButton iconPath={<img src={ModifyPencilIcon} />} onClick={() => {}} size="medium" />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
