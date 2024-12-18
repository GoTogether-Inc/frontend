import SuccessIcon from '../../../../public/assets/SuccessBox.svg';
import EventCategory from '../../../features/event-manage/ui/EventCategory';
import EventTag from '../../../features/event-manage/ui/EventTag';

const EventTagPage = () => {
  return (
    <div className="flex flex-col justify-start w-full px-5 space-y-5">
      <div>
        <img src={SuccessIcon} alt="완료 상자" className="w-full mb-4" />
        <h1 className="text-black font-bold text-center text-2xl mb-1">축하해요! 이벤트가 완성됐어요</h1>
        <h2 className="text-placeholderText text-center text-16">
          아래 정보를 추가하면 참가자분들이 모이기 훨씬 쉬워져요
        </h2>
      </div>

      <EventCategory className="w-52" />
      <EventTag className="w-90 h-40" />
    </div>
  );
};

export default EventTagPage;
