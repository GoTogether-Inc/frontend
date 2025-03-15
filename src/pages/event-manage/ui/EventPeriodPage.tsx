import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';
import EventDatePicker from '../../../features/event-manage/event-create/ui/DatePicker';

const EventPeriodPage = () => {
  const { eventState, setEventState } = useFunnelState();

  return (
    <div className="flex justify-start items-center w-full p-5">
      <EventDatePicker eventState={eventState} setEventState={setEventState} />
    </div>
  );
};

export default EventPeriodPage;
