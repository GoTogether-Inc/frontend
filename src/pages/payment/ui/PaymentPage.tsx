import Header from '../../../../design-system/ui/Header';
import ticket from '../../../../public/assets/dashboard/ticket/Ticket(horizon).svg';
import PaymentCard from '../../../widgets/payment/ui/PaymentCard';
import Button from '../../../../design-system/ui/Button';
import PaymentLayout from '../../../shared/ui/backgrounds/PaymentLayout';

const PaymentPage = () => {
  return (
    <PaymentLayout centerContent="결제하기">
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
      <div className="flex flex-grow"></div>
      <div className="p-7">
        <Button label="결제하기" onClick={() => console.log('결제 진행')} className="rounded-full h-12 w-full" />
      </div>
    </PaymentLayout>
  );
};

export default PaymentPage;
