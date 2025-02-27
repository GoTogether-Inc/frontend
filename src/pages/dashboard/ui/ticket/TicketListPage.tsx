import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Ticket from '../../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import { TicketMockData } from '../../../../shared/types/ticketType';
import TicketItem from '../../../../widgets/dashboard/ui/TicketItem';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '../../../../app/routes/routes';
import HorizontalCardButton from '../../../../../design-system/ui/buttons/HorizontalCardButton';
import AddButton from '../../../../../public/assets/dashboard/create_ticket/AddButton.svg';

const TicketListPage = () => {
  const navigate = useNavigate();

  const navigateToTicketCreate = () => {
    navigate(DASHBOARD_ROUTES.ticketCreate);
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓(입장권)</div>
        <p className="text-gray-400 text-sm mb-5">
          참가자들이 이벤트에 접속, 혹은 입장 할 수 있도록 티켓을 만들어 주세요.
          <br />
          적어도 1개의 티켓이 필요합니다.
        </p>

        {/*티켓 생성 페이지 이동 버튼*/}
        <div className="flex items-center bg-gray3 rounded-lg w-72 h-24 gap-5 mb-10">
          <HorizontalCardButton
            iconPath={<img src={AddButton} alt="추가 버튼" />}
            onClick={navigateToTicketCreate}
            label="티켓 새로 생성하기"
            className="text-xl mx-auto"
          />
        </div>

        {/*티켓 목록 렌더링 구역*/}
        <>
          <div className="flex items-center gap-2 mb-1">
            <img src={Ticket} />
            <p className="font-bold text-base md:text-lg">티켓</p>
          </div>
          {TicketMockData.length > 0 ? (
            TicketMockData.map(value => <TicketItem key={value.eventId} ticket={value} />)
          ) : (
            <div className="text-gray5 font-thin">현재 등록된 티켓이 없습니다.</div>
          )}
        </>
      </div>
    </DashboardLayout>
  );
};

export default TicketListPage;
