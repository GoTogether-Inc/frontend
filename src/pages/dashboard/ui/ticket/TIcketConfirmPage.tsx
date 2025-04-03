import { useEffect, useState } from 'react';
import Header from '../../../../../design-system/ui/Header';
import Search from '../../../../../design-system/icons/Search.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailDeleteMoal from '../../../../widgets/dashboard/ui/EmailDeleteModal';
import PurchaseBanner from '../../../../widgets/dashboard/ui/TicketConfirmPage/PurchaseBanner';
import OrganizerInfo from '../../../../widgets/event/ui/OrganizerInfo';
import KakaoMap from '../../../../shared/ui/KakaoMap';
import { readTicket } from '../../../../features/ticket/api/order';

type Ticket = {
  id: number;
  title: string;
  hostChannelName: string;
  eventAddress: string;
  startDate: string;
  remainDays: string;
  ticketQrCode: string;
  ticketName: string;
  ticketPrice: number;
  orderStatus: "COMPLETED" | "PENDING" | "CANCELED";
};

const TicketConfirmPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const orderIds: number[] = location.state?.orderIds || [];
  const orderId = orderIds[0];

  const [ticket, setTicket] = useState<Ticket | null>(null);
  useEffect(() => {
    const fetchOrderTicket = async () => {
      try {
        const response = await readTicket(orderId);
        setTicket(response.result || []);
      } catch (error) {
        console.error("구매한 티켓 정보 불러오기 실패:", error);
      }
    };
    fetchOrderTicket();
  }, []);
  const handlePreviousButton = () => {
    navigate(-1);
  };

  return (
    <>
      <Header
        leftButtonClassName="text-xl hover:no-underline z-30"
        leftButtonClick={handlePreviousButton}
        leftButtonLabel="<"
        centerContent="티켓 구매 확인"
        rightContent={<img src={Search} alt="검색" className="w-4" />}
      />
      {ticket ? (
        <>
          <div className="bg-gray-100 p-3 min-h-screen flex flex-col gap-3">
            <PurchaseBanner setIsModalOpen={setIsModalOpen} title={ticket.title} startDate={ticket.startDate} startTime={''} ticketName={ticket.ticketName} quantity={orderIds.length} />
            <OrganizerInfo name={ticket.hostChannelName} description={'ss'} phone={'ss'} email={'ss'} bgColor='bg-white' />
            <KakaoMap lat={0} lng={0} /> 
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">티켓 정보를 불러오는 중...</p>
      )}
      {isModalOpen && (
        <EmailDeleteMoal
          mainText="WOOACON 2024의 일반 티켓 2매 구매를 취소하시겠습니까?. 취소 후에는 복구가 불가능합니다."
          approveButtonText="티켓 취소"
          rejectButtonText="뒤로가기"
          onClose={() => setIsModalOpen(false)}
          onClick={() => navigate('/menu/myticket')}
        />
      )}
    </>
  );
};

export default TicketConfirmPage;
