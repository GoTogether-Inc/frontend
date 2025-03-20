import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import HorizontalCardButton from '../../../../../design-system/ui/buttons/HorizontalCardButton';
import AddButton from '../../../../../public/assets/dashboard/ticket/AddButton.svg';
import Ticket from '../../../../../public/assets/dashboard/ticket/Ticket(horizon).svg'

const TicketOptionPage = () => {
  const navigate = useNavigate();

  return(
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5"> 티켓에 추가 옵션 부착 하기</div>
        <p className="text-gray-400 text-xs mb-5">티켓에 구매하기 전 설문에 응답받기 위해서는 다음 항목을 각 티켓으로 드래그 앤 드롭 해보세요.</p>

        {/*티켓 옵션 생성 페이지 이동 버튼*/}
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
        </>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionPage;