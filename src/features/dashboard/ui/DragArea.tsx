import { useNavigate } from 'react-router-dom';
import DraggableList from './DraggableList';
import { Droppable } from '@hello-pangea/dnd';
import AddButton2 from '../../../../public/assets/dashboard/ticket/AddButton2.svg';
import HorizontalCardButton from '../../../../design-system/ui/buttons/HorizontalCardButton';

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
  responseFormat: string;
  ticketSurveyAddButton?: boolean;
}

const DragArea = ({
  data,
  setData,
  droppableId,
  answerToggled,
  responseFormat,
  ticketSurveyAddButton = true,
}: DragAreaProps) => {
  const navigate = useNavigate();
  const dragArea = data.dragAreas[droppableId];
  const isOptionsArea = droppableId === 'options';
  const isTicketArea = droppableId === 'ticket';

  return (
    <div className="w-full">
      <Droppable droppableId={droppableId} isDropDisabled={isOptionsArea}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${
              isOptionsArea
                ? 'h-80 grid grid-cols-2 gap-2 grid-flow-row content-start'
                : isTicketArea
                ? 'h-48 bg-opacity-5 flex flex-col justify-between'
                : 'grid grid-cols-2 gap-4 auto-rows-auto'
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
                  responseFormat={responseFormat}
                  droppableId={droppableId}
                  // isDragDisabled={isOptionsArea}
                />
              );
            })}
            {ticketSurveyAddButton && isOptionsArea && (
              <button className="col-span-1 flex items-center h-[3.5rem] bg-deDayBgLight rounded">
                <HorizontalCardButton
                  iconPath={<img src={AddButton2} alt="추가 버튼" />}
                  className="text-sm  !justify-start [&>div]:!justify-start"
                  label="티켓 설문 새로 생성하기"
                  onClick={() => {
                    navigate('/dashboard/ticket/option/create');
                  }}
                />
              </button>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragArea;
