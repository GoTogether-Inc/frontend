import { useNavigate } from 'react-router-dom';
import DraggableList from './DraggableList';
import { Droppable } from '@hello-pangea/dnd';
import AddButton2 from '../../../../public/assets/dashboard/ticket/AddButton2.svg';
import HorizontalCardButton from '../../../../design-system/ui/buttons/HorizontalCardButton';
import { TicketOptionsType } from '../../../features/ticket/model/ticketOption';

interface DragAreaProps {
  options: TicketOptionsType[];
  droppableId: string;
  ticketSurveyAddButton?: boolean;
}

const DragArea = ({ options, droppableId, ticketSurveyAddButton = false }: DragAreaProps) => {
  const navigate = useNavigate();
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
                ? 'h-48 bg-opacity-5 flex flex-col gap-2 overflow-y-auto [&>*]:flex-shrink-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300'
                : 'h-80 grid grid-cols-2 gap-2 grid-flow-row content-start'
            }`}
          >
            {options.map((option, index) => (
              <DraggableList
                key={option.id}
                id={String(option.id)}
                content={option.name}
                index={index}
                answerToggled={option.isMandatory}
                responseFormat={option.type}
                droppableId={droppableId}
                isDragDisabled={false}
              />
            ))}
            {ticketSurveyAddButton && isOptionsArea && (
              <div className="col-span-1 flex items-center h-[3.5rem] bg-deDayBgLight rounded">
                <HorizontalCardButton
                  iconPath={<img src={AddButton2} alt="추가 버튼" />}
                  className="text-sm  !justify-start [&>div]:!justify-start"
                  label="티켓 옵션 새로 생성하기"
                  onClick={() => {
                    navigate('/dashboard/:id/ticket/option/create');
                  }}
                />
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragArea;
