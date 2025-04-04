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
  startDate: string;
  startTime: string;
  ticketName: string;
  ticketCnt: number;
  hostChannelName: string;
  hostChannelDescription: string;
  organizerEmail: string;
  organizerPhoneNumber: string;
  eventAddress: string;
  location: { lng: number, lat: number };
  remainDays: string;
  ticketQrCode: string;
  orderStatus: "COMPLETED" | "PENDING" | "CANCELED";
};

const TicketConfirmPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const orderIds: number[] = location.state?.orderIds || [];
  const eventId = location.state?.eventId;
  const ticketId = location.state?.ticketId;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  useEffect(() => {
    const fetchOrderTicket = async () => {
      try {
        const response = await readTicket(ticketId, eventId);
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
            <PurchaseBanner setIsModalOpen={setIsModalOpen} title={ticket.title} startDate={ticket.startDate} startTime={ticket.startTime} ticketName={ticket.ticketName} quantity={orderIds.length} />
            <OrganizerInfo name={ticket.hostChannelName} description={ticket.hostChannelDescription} phone={ticket.organizerPhoneNumber} email={ticket.organizerEmail} bgColor='bg-white' />
            <div className="p-5 bg-white flex flex-col gap-2 rounded-[10px]">
            <p className="font-bold md:text-2xl text-xl">오시는 길</p>
            <p>{ticket.eventAddress}</p>
            <KakaoMap lat={ticket.location.lat} lng={ticket.location.lng} />
          </div>
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
