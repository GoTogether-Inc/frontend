import EventSliderSection from './EventSliderSection';
import { useLatestEvents, useTrendingEvents, useClosingSoonEvents } from '../hooks/useEventHook';

const EventTags = () => {
  const { data: latestEvents = [] } = useLatestEvents();
  const { data: trendingEvents = [] } = useTrendingEvents();
  const { data: closingSoonEvents = [] } = useClosingSoonEvents();

  return (
    <>
      <EventSliderSection title="최신 이벤트" events={latestEvents} />
      <EventSliderSection title="요즘 뜨는 이벤트" events={trendingEvents} />
      <EventSliderSection title="곧 이벤트가 마감돼요! ⏰" events={closingSoonEvents} />
    </>
  );
};

export default EventTags;
