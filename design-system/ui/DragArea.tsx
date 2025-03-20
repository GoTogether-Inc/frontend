import DraggableList from './DraggableList';
import { Droppable } from '@hello-pangea/dnd';

interface Task {
  id: string;
  content: string;
}

interface DragAreaProps {
  data: {
    tasks: { [key: string]: Task };
    columns: {
      [key: string]: {
        id: string;
        title: string;
        taskIds: string[];
      };
    };
    columnOrder: string[];
  };
  setData: React.Dispatch<React.SetStateAction<DragAreaProps['data']>>;
  droppableId: string;
}

const DragArea = ({ data, setData, droppableId }: DragAreaProps) => {
  const column = data.columns[droppableId];
  const isOptionsArea = droppableId === 'options';

  return (
    <div className="w-full py-2">
      {/* <p className="text-sm font-bold p-4">{column.title}</p> */}
      <Droppable droppableId={droppableId} isDropDisabled={isOptionsArea}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`grid grid-cols-2 gap-4 h-36 ${
              !isOptionsArea && snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-white'
            }`}
          >
            {column.taskIds.map((taskId, index) => {
              const task = data.tasks[taskId];
              return (
                <DraggableList
                  key={task.id}
                  id={task.id}
                  content={task.content}
                  index={index}
                  isDragDisabled={isOptionsArea}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragArea;
