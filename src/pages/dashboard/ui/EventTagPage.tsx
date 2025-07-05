import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../design-system/ui/Button';
import EventCategory from '../../../features/event/ui/EventCategory';
import EventTag from '../../../features/event/ui/EventTag';
import { useFunnelState } from '../../../features/event/model/FunnelContext';

const EventTagPage = () => {
  const navigate = useNavigate();
  const { eventState, setEventState } = useFunnelState();
  const { id } = useParams();
  const handleEventTag = (hashtagId : number) => {
    navigate(`/dashboard/${id}`);
  }

  return (
    <DashboardLayout centerContent="DASHBOARD">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <h1 className="text-center text-xl font-bold mb-5">이벤트 태그 정보</h1>
        <EventCategory />
        <EventTag eventState={eventState} setEventState={setEventState} />
      </div>
      <div className="w-full p-7">
        <Button
          label="저장하기"
          onClick={() => handleEventTag(1)}
          className="w-full h-12 rounded-full"
        />
      </div>
    </DashboardLayout>
  );
};
export default EventTagPage;
