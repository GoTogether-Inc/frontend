import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import EventOverview from '../../../widgets/dashboard/ui/EventOverview';
import TicketRevenue from '../../../widgets/dashboard/ui/TicketRevenue';
import ticket from '../../../../public/assets/dashboard/main/Ticket(white).svg';
import cash from '../../../../public/assets/dashboard/main/Cash.svg';
import CheckList from '../../../features/dashboard/ui/Checklist';

const DashboardPage = () => {
  return (
    <DashboardLayout centerContent="대시보드" pinkBg={true}>
      <div className="flex flex-col mt-8 md:mt-13 px-7 gap-4">
        <h1 className="text-2xl font-bold">WOOACON 2024</h1>
        <CheckList />
        <EventOverview />
        <div className="flex w-full justify-between gap-3">
          <TicketRevenue
            icon={<img src={ticket} alt="티켓" className="w-8 md:w-9" />}
            title="티켓 판매 수"
            value="0개"
          />
          <TicketRevenue icon={<img src={cash} alt="돈" className="w-8 md:w-9" />} title="판매 금액" value="0원" />
        </div>
      </div>
    </DashboardLayout>
  );
};
export default DashboardPage;
