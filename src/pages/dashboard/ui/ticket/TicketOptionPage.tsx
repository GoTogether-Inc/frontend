import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import HorizontalCardButton from '../../../../../design-system/ui/buttons/HorizontalCardButton';
import IconText from '../../../../../design-system/ui/texts/IconText';
import DragArea from '../../../../../design-system/ui/DragArea';
import AddButton from '../../../../../public/assets/dashboard/ticket/AddButton.svg';
import Ticket from '../../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import Tag from '../../../../../public/assets/dashboard/ticket/emailIcon.svg';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface Data {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

const TicketOptionPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data>({
    tasks: {
      'task-1': { id: 'task-1', content: '티셔츠 사이즈' },
      'task-2': { id: 'task-2', content: '음식 선호도' },
    },
    columns: {
      options: {
        // 옵션 영역
        id: 'options',
        title: '옵션',
        taskIds: ['task-1', 'task-2'],
      },
      ticket: {
        // 티켓 영역
        id: 'ticket',
        title: '티켓',
        taskIds: [],
      },
    },
    columnOrder: ['options', 'ticket'],
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      // options 영역 내에서는 이동 불가
      if (source.droppableId === 'options') {
        return;
      }

      // ticket 영역 내에서만 순서 변경 가능
      if (source.droppableId === 'ticket') {
        const column = data.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        setData(prev => ({
          ...prev,
          columns: {
            ...prev.columns,
            [source.droppableId]: {
              ...column,
              taskIds: newTaskIds,
            },
          },
        }));
      }
      return;
    }

    // options에서 ticket으로 이동할 때
    if (source.droppableId === 'options' && destination.droppableId === 'ticket') {
      const sourceColumn = data.columns[source.droppableId];
      const destColumn = data.columns[destination.droppableId];

      // ticket 영역의 마지막에 추가
      const newDestTaskIds = [...destColumn.taskIds, draggableId];

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [destination.droppableId]: {
            ...destColumn,
            taskIds: newDestTaskIds,
          },
        },
      }));
    }
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓에 추가 옵션 부착 하기</div>
        <p className="text-gray-400 text-xs mb-5">
          티켓에 구매하기 전 설문에 응답받기 위해서는 다음 항목을 각 티켓으로 드래그 앤 드롭 해보세요.
        </p>

        <DragDropContext onDragEnd={onDragEnd}>
          {/* 옵션 영역 */}
          <div className="mb-8">
            <IconText iconPath={<img src={Tag} alt="추가 버튼" />} children="옵션" />
            <DragArea data={data} setData={setData} droppableId="options" />

            <div className="flex items-center bg-gray-300 rounded-lg w-48 h-12 gap-5 mb-10">
              <HorizontalCardButton
                iconPath={<img src={AddButton} alt="추가 버튼" />}
                onClick={() => navigate('/dashboard/ticket/option/create')}
                label="티켓 새로 생성하기"
                className="text-sm mx-auto"
              />
            </div>
          </div>

          {/* 티켓 영역 */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img src={Ticket} alt="티켓" />
              <p className="font-bold text-base md:text-lg">티켓</p>
            </div>
            <DragArea data={data} setData={setData} droppableId="ticket" />
          </div>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionPage;
