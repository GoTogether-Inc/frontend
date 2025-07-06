import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../design-system/ui/Button';
import EventCategory from '../../../features/event/ui/EventCategory';
import EventTag from '../../../features/event/ui/EventTag';
import { useFunnelState } from '../../../features/event/model/FunnelContext';
import { useUpdateEventHook } from '../../../features/dashboard/hook/useEventHook';
import { useEventDetail } from '../../../entities/event/hook/useEventHook';
import { useEffect } from 'react';

const EventTagPage = () => {
  const navigate = useNavigate();
  const { eventState, setEventState } = useFunnelState();
  const { id } = useParams();
  const { mutate } = useUpdateEventHook();
  const { data } = useEventDetail();
  useEffect(() => {
    if (data?.result.hashtags && setEventState) {
      setEventState(prev => ({
        ...prev,
        hashtags: data.result.hashtags,
      }));
    }
  }, [data, setEventState]);
  const handleEventTag = () => {
    if (!id || !data?.result) return;

    const cleanedTags = eventState.hashtags.filter(tag => tag.trim() !== '');

    const requestData = {
      ...data.result, 
      hostChannelId: data.result.hostChannelId,
      hashtags: cleanedTags, 
    };

    mutate(requestData, {
      onSuccess: () => {
        alert('이벤트 정보가 저장되었습니다.');
        navigate(`/dashboard/${id}`);
      },
      onError: () => {
        alert('저장에 실패했습니다.');
      },
    });
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
          onClick={() => handleEventTag()}
          className="w-full h-12 rounded-full"
        />
      </div>
    </DashboardLayout>
  );
};
export default EventTagPage;
