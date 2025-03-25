import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import EventOverview from '../../../widgets/dashboard/ui/EventOverview';
import TicketRevenue from '../../../widgets/dashboard/ui/TicketRevenue';
import ticket from '../../../../public/assets/dashboard/main/Ticket(white).svg';
import cash from '../../../../public/assets/dashboard/main/Cash.svg';
import CheckList from '../../../features/dashboard/ui/Checklist';
import { useGetEventHook } from '../../../features/dashboard/hook/useGetEventHook';

const DashboardPage = () => {
  const { eventInfo } = useGetEventHook();

  return (
    <DashboardLayout centerContent="대시보드" pinkBg={true}>
      <div className="flex flex-col mt-8 md:mt-13 px-7 gap-4">
        <h1 className="text-2xl font-bold">{eventInfo?.eventName}</h1>
        <CheckList />
        <EventOverview eventInfo={eventInfo} />
        <div className="flex w-full justify-between gap-3">
          <TicketRevenue
            icon={<img src={ticket} alt="티켓" className="w-8 md:w-9" />}
            title="티켓 판매 수"
            value={`${eventInfo?.totalTicketCnt}장`}
          />
          <TicketRevenue
            icon={<img src={cash} alt="돈" className="w-8 md:w-9" />}
            title="판매 금액"
            value={`${eventInfo?.totalPrice}원`}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
export default DashboardPage;
