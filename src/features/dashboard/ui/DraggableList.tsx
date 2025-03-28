import { Draggable } from '@hello-pangea/dnd';

interface DraggableListProps {
  id: string; // task의 id
  content: string; // task의 content
  index: number; // 드래그앤드롭 위치 추적용
  isDragDisabled?: boolean;
  answerToggled: boolean;
}

const DraggableList = ({ id, content, index, isDragDisabled = false, answerToggled }: DraggableListProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded border w-full h-[3rem] flex items-center ${snapshot.isDragging ? 'bg-gray-100' : 'bg-white'}`}
        >
          {content}
          {answerToggled && <div className="w-full h-full bg-red-500">123</div>}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
