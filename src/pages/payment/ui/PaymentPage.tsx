import Header from '../../../../design-system/ui/Header';
import ticket from '../../../../public/assets/dashboard/create_ticket/Ticket(horizon).svg';
import PaymentCard from '../../../widgets/payment/ui/PaymentCard';

const PaymentPage = () => {
  return (
    <div className="relative flex flex-col gap-2">
      {/*헤더 영역*/}
      <div className="absolute top-0 w-full h-36 md:h-40 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px] z-10">
        <Header centerContent="결제하기" leftButtonLabel="<" color="white" leftButtonClassName="text-xl z-30" />
      </div>
      {/*티켓 정보*/}
      <div className="flex flex-col justify-between w-[90%] h-40 bg-white rounded-md mt-24 mx-auto z-10 shadow-md p-6">
        <div className="flex flex-col">
          <p className="font-bold text-sm md:text-base">티켓 정보</p>
          <p className="text-gray-400 text-xs md:text-sm">티켓 수량을 선택하고 결제 수단을 선택하세요</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2">
            <img src={ticket} alt="ticket logo" />
            <div>
              <p className="font-bold text-sm md:text-base">콘서트 티켓</p>
              <p className="text-gray-400 text-xs md:text-sm">50,000원 / 장</p>
            </div>
          </div>
          <p className="font-bold text-sm md:text-base">2매</p>
        </div>
      </div>
      {/*결제 카드 선택 */}
      <div className="px-1">
        <PaymentCard title="결제 수단 선택" />
      </div>
      <div className="w-full flex flex-col p-6 gap-5">
        <div className="w-full h-[2px] bg-gray-200"></div>
        <div className="flex flex-col gap-5">
          <p className="font-semibold md:text-xl text-base">결제 금액</p>
          <div className="flex flex-row w-full justify-between">
            <p className="md:text-base text-sm">총 결제 금액</p>
            <p className="font-semibold md:text-base text-sm">100,000원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
