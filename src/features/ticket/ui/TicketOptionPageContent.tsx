import { useTicketOption } from '../model/TicketOptionContext';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTicketOptionQuery } from '../hooks/useTicketOptionQuery';
import { useTicketOptionDnD } from '../hooks/useTicketOptionDnD';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import IconText from '../../../../design-system/ui/texts/IconText';
import DragArea from '../../dashboard/ui/DragArea';
import Ticket from '../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import Option from '../../../../public/assets/dashboard/ticket/Option.svg';

const TicketOptionPageContent = () => {
  const { options, selectedOptions } = useTicketOption();
  const { isLoading, isError } = useTicketOptionQuery();
  const { onDragEnd } = useTicketOptionDnD();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터 없음</div>;

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
              <DragArea options={options} droppableId="options" ticketSurveyAddButton={true} />
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
                <p className="pr-2 pb-2 font-bold text-gray-400 text-xs">설문 {selectedOptions.length}개</p>
              </div>
              <DragArea options={selectedOptions} droppableId="ticket" />
            </div>
          </div>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionPageContent;