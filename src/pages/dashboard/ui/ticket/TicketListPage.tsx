import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Ticket from '../../../../../public/assets/dashboard/create_ticket/Ticket(horizon).svg';
import { TicketMockData } from '../../../../shared/types/ticketType';
import TicketItem from '../../../../features/dashboard/ui/TicketItem';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '../../../../app/routes/routes';

const TicketListPage = () => {
  const navigate = useNavigate();

  const navigateToTicketCreate = () => {
    navigate(DASHBOARD_ROUTES.ticketCreate);
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="p-5">
        <div className="w-full text-center font-bold text-xl mb-15">티켓(입장권)</div>
        <p className="text-gray-400 text-xs mb-3">
          참가자들이 이벤트에 접속, 혹은 입장 할 수 있도록 티켓을 만들어 주세요.
          <br />
          적어도 1개의 티켓이 필요합니다.
        </p>

        {/*티켓 생성 페이지 이동 버튼*/}
        <button
          className="bg-gray3 rounded-lg w-80 h-24 flex items-center justify-center gap-4 mb-10 "
          onClick={navigateToTicketCreate}
        >
          <div className="rounded-full bg-white w-10 h-10 text-3xl text-center font-thin">+</div>
          <p className="text-xl ">티켓 새로 생성하기</p>
        </button>

        {/*티켓 목록 렌더링 구역*/}
        <div className="w-full">
          <div className="flex gap-1 items-center mb-1">
            <img src={Ticket} />
            <p className="font-bold text-xl">티켓</p>
          </div>

          {TicketMockData.length > 0 ? (
            TicketMockData.map(value => <TicketItem key={value.eventId} ticket={value} />)
          ) : (
            <div className="text-gray5 font-thin">현재 등록된 티켓이 없습니다.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketListPage;
