import { useRef, useEffect } from 'react';
import { useInfiniteScroll } from '../../../../shared/hooks/useInfiniteScroll';
import { getAllEventsInfinite } from '../../../../entities/event/api/event';
import EventCard from '../../../../shared/ui/EventCard';
import { BaseEvent } from '../../../../shared/types/baseEventType';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
interface EventListProps extends BaseEvent{
  id: number;
  hostChannelName: string;
  remainDays: string;
}

const EventList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll<EventListProps>({
    queryKey: ['events', 'infinite'],
    queryFn: getAllEventsInfinite,
    size: 10,
    filters: { tag: 'current' },
  });

  const observerRef = useRef<IntersectionObserver>();
  const lastEventCardRef = useRef<HTMLDivElement | null>(null);

  console.log('EventList data.pages:', data?.pages);

  useEffect(() => {
    if (!hasNextPage || isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (lastEventCardRef.current) observerRef.current.observe(lastEventCardRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mx-6 mt-2 md:grid-cols-2 lg:grid-cols-2">
        {data?.pages.map((page, pageIndex) =>
          page.items.map((event: EventListProps, eventIndex) => {
            const isLastElement = pageIndex === data.pages.length - 1 && eventIndex === page.items.length - 1;
            return (
              <div key={event.id} ref={isLastElement ? lastEventCardRef : null}>
                <EventCard
                  id={event.id}
                  img={event.bannerImageUrl}
                  eventTitle={event.title}
                  eventDate={event.startDate}
                  location={event.address}
                  host={event.hostChannelName}
                  hashtags={event.hashtags}
                  dDay={event.remainDays}
                />
              </div>
            );
          })
        )}
      </div>
      {isFetching && <div className="text-center py-4">Loading...</div>}
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </>
  );
};

export default EventList;
