import DraggableList from './DraggableList';
import { Droppable } from '@hello-pangea/dnd';

interface OptionTitle {
  id: string;
  content: string;
}

interface DragAreaProps {
  data: {
    options: { [key: string]: OptionTitle };
    dragAreas: {
      [key: string]: {
        id: string;
        title: string;
        optionIds: string[];
      };
    };
    dragAreaOrder: string[];
  };
  setData: React.Dispatch<React.SetStateAction<DragAreaProps['data']>>;
  droppableId: string;
  answerToggled: boolean;
}

const DragArea = ({ data, setData, droppableId, answerToggled }: DragAreaProps) => {
  const dragArea = data.dragAreas[droppableId];
  const isOptionsArea = droppableId === 'options';
  const isTicketArea = droppableId === 'ticket';
  return (
    <div className="w-full">
      {/* <p className="text-sm font-bold p-4">{column.title}</p> */}
      <Droppable droppableId={droppableId} isDropDisabled={isOptionsArea}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`h-[10rem] ${
              isOptionsArea ? 'grid grid-cols-2 gap-4' : isTicketArea ? 'bg-pink-100 flex flex-col justify-between' : 'grid grid-cols-2 gap-4'
            }`}
          >
            {dragArea.optionIds.map((optionId, index) => {
              const option = data.options[optionId];
              return (
                <DraggableList
                  key={option.id}
                  id={option.id}
                  content={option.content}
                  index={index}
                  answerToggled={answerToggled}
                  // isDragDisabled={isOptionsArea}
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
