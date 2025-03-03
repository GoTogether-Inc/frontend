import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../design-system/ui/Button';
import EventCategory from '../../../features/event-manage/ui/EventCategory';
import EventTag from '../../../features/event-manage/ui/EventTag';

const EventTagPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <h1 className="text-center text-xl font-bold mb-5">이벤트 태그 정보</h1>
        <EventCategory />
        <EventTag />
      </div>
      <div className="w-full p-7">
        <Button
          label="저장하기"
          onClick={() => navigate('/dashbord/eventDetail')}
          className="w-full h-12 rounded-full"
        />
      </div>
    </DashboardLayout>
  );
};
export default EventTagPage;
