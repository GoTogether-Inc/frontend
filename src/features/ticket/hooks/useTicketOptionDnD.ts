import { DropResult } from '@hello-pangea/dnd';
import { useTicketOption } from '../model/TicketOptionContext';

export const useTicketOptionDnD = () => {
  const { options, selectedOptions, setSelectedOptions } = useTicketOption();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // 같은 영역 내에서의 이동
    if (destination.droppableId === source.droppableId) {
      if (source.droppableId === 'options') return;
      if (source.droppableId === 'ticket') {
        const newSelectedOptions = Array.from(selectedOptions);
        const [movedOption] = newSelectedOptions.splice(source.index, 1);
        newSelectedOptions.splice(destination.index, 0, movedOption);
        setSelectedOptions(newSelectedOptions);
      }
      return;
    }

    // options에서 ticket으로 이동할 때
    if (source.droppableId === 'options' && destination.droppableId === 'ticket') {
      const optionToAdd = options.find(opt => String(opt.id) === draggableId);
      if (optionToAdd) {
        const newSelectedOptions = Array.from(selectedOptions);
        newSelectedOptions.splice(destination.index, 0, optionToAdd);
        setSelectedOptions(newSelectedOptions);
      }
    }
  };

  return { onDragEnd };
};
