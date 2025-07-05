import { useState } from 'react';
import Header from '../../../../../design-system/ui/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailDeleteModal from '../../../../widgets/dashboard/ui/email/EmailDeleteModal';
import PurchaseBanner from '../../../../widgets/dashboard/ui/ticket/PurchaseBanner';
import OrganizerInfo from '../../../../widgets/event/ui/OrganizerInfo';
import KakaoMap from '../../../../shared/ui/KakaoMap';
import { useCancelTicket, useTicketOrderDetail } from '../../../../features/ticket/hooks/useOrderHook';
import { TicketConfirm } from '../../../../features/ticket/model/orderInformation';
import HomeButton from '../../../../../public/assets/Home.svg';

const TicketConfirmPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const orderIds: number[] = location.state?.orderIds || [];
  const orderId = orderIds.length > 0 ? orderIds[0] : 0;
  const { data, isLoading, isError } = useTicketOrderDetail(orderId);
  const ticket = data?.result as TicketConfirm | undefined;
  const { mutate: cancelTicket } = useCancelTicket();

  const handlePreviousButton = () => {
    navigate("/");
  };
  const cancleOrderTicket = async (orderIds: number[]) => {
    cancelTicket(orderIds, {
      onSuccess: () => {
        navigate('/menu/myticket');
      },
    });
  };
  return (
    <>
      <Header
        leftButtonClassName="text-xl hover:no-underline z-30"
        leftButtonClick={handlePreviousButton}
        leftButtonLabel={<img src={HomeButton} />}
        centerContent="티켓 구매 확인"
      />
      {isLoading ? (
        <p className="text-center text-gray-500">티켓 정보를 불러오는 중...</p>
      ) : isError || !ticket ? (
        <p className="text-center text-red-500">티켓 정보를 불러오는 데 실패했습니다.</p>
      ) : (
        <>
          <div className="bg-gray-100 p-3 min-h-screen flex flex-col gap-3">
            <PurchaseBanner
              setIsModalOpen={setIsModalOpen}
              title={ticket.title}
              startDate={ticket.startDate}
              ticketName={ticket.ticketName}
              quantity={orderIds.length}
            />
            <OrganizerInfo
              name={ticket.hostChannelName}
              description={ticket.hostChannelDescription}
              phone={ticket.organizerPhoneNumber}
              email={ticket.organizerEmail}
              bgColor="bg-white"
            />
            <div className="p-5 bg-white flex flex-col gap-2 rounded-[10px]">
              <p className="font-bold md:text-2xl text-xl">오시는 길</p>
              <p>{ticket.eventAddress}</p>
              <KakaoMap lat={ticket.locationLat} lng={ticket.locationLng} />
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <EmailDeleteModal
          mainText={`${ticket?.title}의 ${ticket?.ticketName} ${orderIds.length}매 구매를 취소하시겠습니까?. 취소 후에는 복구가 불가능합니다.`}
          approveButtonText="티켓 취소"
          rejectButtonText="뒤로가기"
          onClose={() => setIsModalOpen(false)}
          onClick={() => cancleOrderTicket(orderIds)}
        />
      )}
    </>
  );
};

export default TicketConfirmPage;
