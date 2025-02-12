import { useFunnelState } from '../../../features/event-manage/model/FunnelContext';
import EventDatePicker from '../../../features/event-manage/ui/DatePicker';

const EventPeriodPage = () => {
  const { formState, setFormState } = useFunnelState();

  return (
    <div className="flex justify-start items-center w-full p-5">
      <EventDatePicker formState={formState} setFormState={setFormState} />
    </div>
  );
};

export default EventPeriodPage;
