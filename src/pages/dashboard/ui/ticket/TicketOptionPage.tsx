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
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
    },
    columnOrder: ['column-1'],
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [source.droppableId]: { ...column, taskIds: newTaskIds },
      },
    }));
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5"> 티켓에 추가 옵션 부착 하기</div>
        <p className="text-gray-400 text-xs mb-5">
          티켓에 구매하기 전 설문에 응답받기 위해서는 다음 항목을 각 티켓으로 드래그 앤 드롭 해보세요.
        </p>
        <DragDropContext onDragEnd={onDragEnd}>
          {/*티켓 옵션 생성 페이지 이동 버튼*/}
          <IconText iconPath={<img src={Tag} alt="추가 버튼" />} children="옵션" />
          <div>
            {data.columnOrder.map(columnId => (
              <DragArea key={columnId} data={data} setData={setData} droppableId={columnId} />
            ))}
          </div>
          <div className="flex items-center bg-gray3 rounded-lg w-72 h-12 gap-5 mb-10">
            <HorizontalCardButton
              iconPath={<img src={AddButton} alt="추가 버튼" />}
              onClick={() => navigate('/dashboard/ticket/option/create')}
              label="티켓 새로 생성하기"
              className="text-sm mx-auto"
            />
          </div>

          {/*티켓 옵션 렌더링 구역*/}
          <>
            <div className="flex items-center gap-2 mb-1">
              <img src={Ticket} />
              <p className="font-bold text-base md:text-lg">티켓</p>
            </div>
            <div className="w-20 h-20 bg-red-500"></div>
          </>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionPage;
