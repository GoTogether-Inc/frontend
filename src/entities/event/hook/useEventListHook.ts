import { EventList } from '../../../features/event/event-list/model/eventList';
import { useInfiniteScroll } from '../../../shared/hooks/useInfiniteScroll';
import { getAllEventsInfinite } from '../api/eventDetail';

const useEventList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll<EventList>({
    queryKey: ['events', 'infinite'],
    queryFn: getAllEventsInfinite,
    size: 10,
    filters: { tag: 'current' },
  });
  return { data, fetchNextPage, hasNextPage, isFetching };
};
export default useEventList;
