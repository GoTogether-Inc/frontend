import { Draggable } from '@hello-pangea/dnd';

interface DraggableListProps {
  id: string; // task의 id
  content: string; // task의 content
  index: number; // 드래그앤드롭 위치 추적용
}

const DraggableList = ({ id, content, index }: DraggableListProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 mb-2 border border-gray-300 rounded-lg bg-white"
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableList;
