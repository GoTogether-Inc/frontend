import { getEventByTag } from '../../../entities/event/api/event';
import { useQuery } from '@tanstack/react-query';
import EventSliderSection from './EventSliderSection';

const EventTags = () => {
  // API 호출을 위한 React Query 설정
  const { data: latestEvents = { result: [] } } = useQuery({
    queryKey: ['events', 'latest'],
    queryFn: () => getEventByTag('current', { page: 0, size: 10 }),
  });

  const { data: trendingEvents = { result: [] } } = useQuery({
    queryKey: ['events', 'trending'],
    queryFn: () => getEventByTag('popular', { page: 0, size: 10 }),
  });

  const { data: closingSoonEvents = { result: [] } } = useQuery({
    queryKey: ['events', 'closing'],
    queryFn: () => getEventByTag('deadline', { page: 0, size: 10 }),
  });

  return (
    <>
      <EventSliderSection 
        title="최신 이벤트"
        events={latestEvents.result}
      />
      <EventSliderSection 
        title="요즘 뜨는 이벤트"
        events={trendingEvents.result}
      />
      <EventSliderSection 
        title="곧 이벤트가 마감돼요! ⏰"
        events={closingSoonEvents.result}
      />
    </>
  );
};

export default EventTags;
