import SuccessIcon from '../../../../public/assets/event-manage/creation/SuccessBox.svg';
import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';
import EventCategory from '../../../features/event-manage/event-create/ui/EventCategory';
import EventTag from '../../../features/event-manage/event-create/ui/EventTag';

const EventTagPage = () => {
  const { formState, setFormState } = useFunnelState();

  return (
    <div className="flex flex-col justify-start w-full px-5 space-y-5">
      <div>
        <img src={SuccessIcon} alt="완료 상자" className="w-full mb-4" />
        <h1 className="text-black font-bold text-center text-2xl mb-1">축하해요! 이벤트가 완성됐어요</h1>
        <h2 className="text-placeholderText text-center text-16">
          아래 정보를 추가하면 참가자분들이 모이기 훨씬 쉬워져요
        </h2>
      </div>

      <EventCategory formState={formState} setFormState={setFormState} />
      <EventTag formState={formState} setFormState={setFormState} />
    </div>
  );
};

export default EventTagPage;
