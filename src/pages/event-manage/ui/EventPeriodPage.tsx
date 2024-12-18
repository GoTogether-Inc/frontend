import EventDatePicker from '../../../features/event-manage/ui/DatePicker';

const EventPeriodPage = () => {
  return (
    <div className="flex justify-start items-center w-full p-5">
      <EventDatePicker title="이벤트 기간" textSize="text-lg" />
    </div>
  );
};

export default EventPeriodPage;
