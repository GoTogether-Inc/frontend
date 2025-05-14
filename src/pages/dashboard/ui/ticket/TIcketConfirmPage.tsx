import { useState } from 'react';
import Header from '../../../../../design-system/ui/Header';
import Search from '../../../../../design-system/icons/Search.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailDeleteModal from '../../../../widgets/dashboard/ui/email/EmailDeleteModal';
import PurchaseBanner from '../../../../widgets/dashboard/ui/ticket/PurchaseBanner';
import OrganizerInfo from '../../../../widgets/event/ui/OrganizerInfo';
import KakaoMap from '../../../../shared/ui/KakaoMap';
import { useCancelTicket, useTicketOrderDetail } from '../../../../features/ticket/hooks/useOrderHook';
import { TicketConfirm } from '../../../../features/ticket/model/orderInformation';

const TicketConfirmPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const orderIds: number[] = location.state?.orderIds || [];
  const eventId = location.state?.eventId || 0;
  const ticketId = location.state?.ticketId || 0;
  console.log(eventId,ticketId)
  const { data, isLoading, isError } = useTicketOrderDetail(ticketId, eventId);
  const ticket = data?.result as TicketConfirm | undefined;
  const { mutate: cancelTicket } = useCancelTicket();

  const handlePreviousButton = () => {
    navigate(-1);
  };
  const cancleOrderTicket = async (orderIds: number[]) => {
    for (const orderId of orderIds) {
      cancelTicket(orderId);
    }
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
          onClick={() => {
            cancleOrderTicket(orderIds).then(() => {
              navigate('/menu/myticket');
            });
          }}
        />
      )}
    </>
  );
};

export default TicketConfirmPage;
