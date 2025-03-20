import { Draggable } from '@hello-pangea/dnd';

interface DraggableListProps {
  id: string; // task의 id
  content: string; // task의 content
  index: number; // 드래그앤드롭 위치 추적용
  isDragDisabled?: boolean;
}

const DraggableList = ({ id, content, index, isDragDisabled = false }: DraggableListProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 bg-white rounded border ${snapshot.isDragging ? 'shadow-lg' : ''}`}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
