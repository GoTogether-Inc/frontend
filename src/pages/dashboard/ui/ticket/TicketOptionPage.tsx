import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import IconText from '../../../../../design-system/ui/texts/IconText';
import DragArea from '../../../../features/dashboard/ui/DragArea';
import Ticket from '../../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import Option from '../../../../../public/assets/dashboard/ticket/Option.svg';

interface OptionTitle {
  id: string;
  content: string;
}

interface DragAreaTitle {
  id: string;
  title: string;
  optionIds: string[];
}

interface Data {
  options: { [key: string]: OptionTitle };
  dragAreas: { [key: string]: DragAreaTitle };
  dragAreaOrder: string[];
}

const TicketOptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answerToggled = location.state?.answerToggled;
  const responseFormat = location.state?.responseFormat;
  const newOption = location.state?.newOption;

  // localStorage에서 저장된 데이터 가져오기
  const savedData = localStorage.getItem('ticketOptions');

  // 기본 초기 데이터
  const defaultData: Data = {
    options: {
      'option-1': { id: 'option-1', content: '티셔츠 사이즈' },
      'option-2': { id: 'option-2', content: '음식 선호도' },
      'option-3': { id: 'option-3', content: '좋아하는 색깔' },
    },
    dragAreas: {
      options: {
        // 옵션 영역
        id: 'options',
        title: '옵션',
        optionIds: ['option-1', 'option-2', 'option-3'],
      },
      ticket: {
        // 티켓 영역
        id: 'ticket',
        title: '티켓',
        optionIds: [],
      },
    },
    dragAreaOrder: ['options', 'ticket'],
  };

  // localStorage에 저장된 데이터가 있으면 사용, 없으면 기본값 사용
  let initialData: Data = savedData ? JSON.parse(savedData) : defaultData;

  // 새로운 옵션이 있고, 이미 존재하지 않는 경우에만 추가
  if (newOption && !initialData.options[newOption.id]) {
    initialData = {
      ...initialData,
      options: {
        ...initialData.options,
        [newOption.id]: newOption,
      },
      dragAreas: {
        ...initialData.dragAreas,
        options: {
          ...initialData.dragAreas.options,
          optionIds: [...initialData.dragAreas.options.optionIds, newOption.id],
        },
      },
    };

    // 업데이트된 데이터를 localStorage에 저장
    localStorage.setItem('ticketOptions', JSON.stringify(initialData));
  }

  const [data, setData] = useState<Data>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // 드래그 앤 드롭 영역이 아닌 곳에 드롭할 때
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
        const dragArea = data.dragAreas[source.droppableId];
        const newOptionIds = Array.from(dragArea.optionIds);

        newOptionIds.splice(source.index, 1);
        newOptionIds.splice(destination.index, 0, draggableId);

        setData(prev => ({
          ...prev,
          dragAreas: {
            ...prev.dragAreas,
            [source.droppableId]: {
              ...dragArea,
              optionIds: newOptionIds,
            },
          },
        }));
      }
      return;
    }

    // options에서 ticket으로 이동할 때
    if (source.droppableId === 'options' && destination.droppableId === 'ticket') {
      // const sourceDragArea = data.dragAreas[source.droppableId];
      const destDragArea = data.dragAreas[destination.droppableId];

      // ticket 영역의 마지막에 추가
      const newDestOptionIds = [...destDragArea.optionIds, draggableId];

      setData(prev => ({
        ...prev,
        dragAreas: {
          ...prev.dragAreas,
          [destination.droppableId]: {
            ...destDragArea,
            optionIds: newDestOptionIds,
          },
        },
      }));
    }
  };

  // useEffect에서 location.state가 바뀌었을 때만 실행되도록 수정
  useEffect(() => {
    // 데이터가 변경될 때 localStorage에 저장
    localStorage.setItem('ticketOptions', JSON.stringify(data));
  }, [data]);

  // newOption 상태를 초기화 (페이지 이동 후 돌아올 때 중복 추가 방지)
  useEffect(() => {
    if (location.state && location.state.newOption) {
      // state에서 newOption 제거
      const newState = { ...location.state };
      delete newState.newOption;
      navigate(location.pathname, { state: newState, replace: true });
    }
  }, []);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓에 추가 옵션 부착 하기</div>
        <p className="text-placeholderText text-xs mb-5">
          티켓에 구매하기 전 설문에 응답받기 위해서는 다음 항목을 각 티켓으로 드래그 앤 드롭 해보세요.
        </p>

        <DragDropContext onDragEnd={onDragEnd}>
          {/* 옵션 영역 */}
          <div className="mb-8">
            <IconText iconPath={<img src={Option} alt="추가 버튼" />} children="옵션" className="font-bold pl-2" />
            <div className="my-2">
              <DragArea
                data={data}
                setData={setData}
                droppableId="options"
                answerToggled={answerToggled}
                responseFormat={responseFormat}
                ticketSurveyAddButton={true}
              />
            </div>
          </div>

          {/* 티켓 영역 */}
          <div>
            <div className="flex items-center mb-2">
              <IconText iconPath={<img src={Ticket} alt="추가 버튼" />} children="티켓" className="font-bold pl-2" />
            </div>
            <div className="w-1/2 p-2 bg-main bg-opacity-5 rounded-lg">
              <div className="flex flex-row justify-between items-end">
                <p className="pl-2 pb-2 text-base md:text-s">일반</p>
                <p className="pr-2 pb-2 font-bold text-gray-400 text-xs">
                  설문 {Object.keys(data.dragAreas.ticket.optionIds).length}개
                </p>
              </div>
              <DragArea
                data={data}
                setData={setData}
                droppableId="ticket"
                answerToggled={answerToggled}
                responseFormat={responseFormat}
              />
            </div>
          </div>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionPage;
