import { useFunnelState } from '../../../../features/event/model/FunnelContext';
import EventDatePicker from '../../../../features/event/ui/DatePicker';

const EventPeriodPage = () => {
  const { eventState, setEventState } = useFunnelState();

  return (
    <div className="flex justify-start items-center w-full p-5">
      <EventDatePicker eventState={eventState} setEventState={setEventState} />
    </div>
  );
};

export default EventPeriodPage;
