import EventSliderSection from './EventSliderSection';
import { useLatestEvents, useTrendingEvents, useClosingSoonEvents } from '../hooks/useEventHook';

const EventTags = () => {
  const { data: latestEvents = { result: [] } } = useLatestEvents();
  const { data: trendingEvents = { result: [] } } = useTrendingEvents();
  const { data: closingSoonEvents = { result: [] } } = useClosingSoonEvents();

  return (
    <>
      <EventSliderSection title="최신 이벤트" events={latestEvents.result} />
      <EventSliderSection title="요즘 뜨는 이벤트" events={trendingEvents.result} />
      <EventSliderSection title="곧 이벤트가 마감돼요! ⏰" events={closingSoonEvents.result} />
    </>
  );
};

export default EventTags;
