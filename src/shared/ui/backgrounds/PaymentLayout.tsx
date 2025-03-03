import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import ticket from '../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import Button from '../../../../design-system/ui/Button';

interface PaymentLayoutProps {
  children: React.ReactNode;
  centerContent: string;
}

const PaymentLayout = ({ children, centerContent }: PaymentLayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex">
      <div className="absolute top-0 w-full h-36 md:h-40 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[20px]">
        {/* 헤더 영역 */}
        <Header
          leftButtonLabel="<"
          leftButtonClassName="text-2xl z-30 font-semibold"
          leftButtonClick={() => navigate(-1)}
          centerContent={centerContent}
          color="white"
        />
        {/*티켓 정보*/}
        <div className="px-4">
          <div className="flex flex-col justify-between w-[93%] h-36 md:h-40 bg-white rounded-md mt-8 mx-auto z-10 shadow-md px-6 md:px-8 py-5 md:py-6">
            <div className="flex flex-col">
              <p className="font-bold text-sm md:text-base">티켓 정보</p>
              <p className="text-gray-400 text-xs md:text-sm">티켓 수량을 선택하고 결제 수단을 선택하세요</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-4">
                <img src={ticket} alt="ticket logo" className="w-7" />
                <div>
                  <p className="font-bold text-sm md:text-base">콘서트 티켓</p>
                  <p className="text-gray-400 text-xs md:text-sm">50,000원 / 장</p>
                </div>
              </div>
              <p className="font-bold text-sm md:text-base">2매</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-[calc(100vh-17rem)] mt-60 md:mt-64">
        {children}
        <div className="flex flex-grow" />
        <div className="w-full p-6">
          <Button label="다음" onClick={() => {}} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};
export default PaymentLayout;
