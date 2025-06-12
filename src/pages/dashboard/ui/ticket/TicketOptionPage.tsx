import { DragDropContext } from '@hello-pangea/dnd';
import { useGetTicketOptions } from '../../../../features/ticket/hooks/useTicketOptionHook';
import { useTicketOptionDnD } from '../../../../features/ticket/hooks/useTicketOptionDnD';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import IconText from '../../../../../design-system/ui/texts/IconText';
import DragArea from '../../../../features/dashboard/ui/DragArea';
import Ticket from '../../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import Option from '/assets/dashboard/ticket/Option.svg';
import { useParams } from 'react-router-dom';
import { useTickets } from '../../../../features/ticket/hooks/useTicketHook';
import { useQueries } from '@tanstack/react-query';
import { getAttachedTicketOptions } from '../../../../features/ticket/api/ticketOption';
import TextButton from '../../../../../design-system/ui/buttons/TextButton';
import { useState } from 'react';

const TicketOptionPage = () => {
  const [selectedButton, setSelectedButton] = useState<'modify' | 'delete'>('modify');
  const { id: eventId } = useParams();
  const { data: ticketsData } = useTickets(Number(eventId));

  // 티켓 목록
  const tickets = Array.isArray(ticketsData?.result)
    ? ticketsData.result
    : ticketsData?.result
    ? [ticketsData.result]
    : [];

  // 티켓 옵션 목록
  const {
    data: ticketOptionsData,
    isLoading: isTicketOptionsLoading,
    isError: isTicketOptionsError,
  } = useGetTicketOptions();

  // 각 티켓별 부착 옵션 useQueries로 가져오기
  const attachedOptionsQueries = useQueries({
    queries: tickets.map(ticket => ({
      queryKey: ['attachedTicketOptions', ticket.ticketId],
      queryFn: () => getAttachedTicketOptions(ticket.ticketId),
      enabled: !!ticket.ticketId,
    })),
  });

  // 티켓별 옵션 맵핑
  const attachedOptionsMap = tickets.reduce((acc, ticket, idx) => {
    const query = attachedOptionsQueries[idx];
    if (query && query.data && query.data.result) {
      acc[ticket.ticketId] = Array.isArray(query.data.result) ? query.data.result : [query.data.result];
    } else {
      acc[ticket.ticketId] = [];
    }
    return acc;
  }, {} as Record<number, any[]>);

  // 드래그 앤 드롭 핸들러
  const { onDragEnd } = useTicketOptionDnD();

  if (isTicketOptionsLoading) return <div>로딩중...</div>;
  if (isTicketOptionsError) return <div>데이터 없음</div>;

  // 티켓 옵션 목록
  const options = Array.isArray(ticketOptionsData?.result)
    ? ticketOptionsData.result
    : ticketOptionsData?.result
    ? [ticketOptionsData.result]
    : [];

  return (
    <DashboardLayout centerContent="DASHBOARDs">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓에 추가 옵션 부착 하기</div>
        <p className="text-placeholderText text-xs mb-5">
          티켓에 구매하기 전 설문에 응답받기 위해서는 다음 항목을 각 티켓으로 드래그 앤 드롭 해보세요.
        </p>
        <DragDropContext onDragEnd={onDragEnd}>
          <>
            {/* 옵션 영역 */}
            <div className="mb-8">
              <div className="flex flex-row justify-between">
                <IconText iconPath={<img src={Option} alt="추가 버튼" />} children="옵션" className="font-bold pl-2" />
                <div className="flex flex-row items-center gap-2">
                  <TextButton
                    label="수정하기"
                    onClick={() => setSelectedButton('modify')}
                    className={`text-xs ${
                      selectedButton === 'modify' ? 'text-main' : 'text-placeholderText hover:text-main'
                    }`}
                  />
                  <div className="text-xs text-gray-400">|</div>
                  <TextButton
                    label="삭제하기"
                    onClick={() => setSelectedButton('delete')}
                    className={`text-xs ${
                      selectedButton === 'delete' ? 'text-main' : 'text-placeholderText hover:text-main'
                    }`}
                  />
                </div>
              </div>
              <div className="my-2">
                <DragArea
                  options={options}
                  droppableId="options"
                  ticketSurveyAddButton={true}
                  activeButton={selectedButton}
                />
              </div>
            </div>
          </>
          <>
            {/* 티켓 영역 */}
            <div>
              <div className="flex items-center mb-2">
                <IconText iconPath={<img src={Ticket} alt="추가 버튼" />} children="티켓" className="font-bold pl-2" />
              </div>
              <div className="flex flex-row gap-4">
                {tickets.map(ticket => (
                  <div key={ticket.ticketId} className="w-1/2 p-2 bg-main bg-opacity-5 rounded-lg">
                    <div className="flex flex-row justify-between items-end">
                      <p className="pl-2 pb-2 text-base md:text-s">{ticket.ticketName}</p>
                      <p className="pr-2 pb-2 font-bold text-gray-400 text-xs">
                        설문 {attachedOptionsMap[ticket.ticketId]?.length || 0}개
                      </p>
                    </div>
                    <DragArea
                      options={attachedOptionsMap[ticket.ticketId] || []}
                      droppableId={`ticket-${ticket.ticketId}`}
                      activeButton={selectedButton}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionPage;
