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

  return (
    <div className="p-2 m-8 border-2 border-gray-300 rounded-lg">
      <p className="text-sm font-bold p-4">{column.title}</p>
      <Droppable droppableId={droppableId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.taskIds.map((taskId, index) => {
              const task = data.tasks[taskId];
              return <DraggableList key={task.id} id={task.id} content={task.content} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragArea;
