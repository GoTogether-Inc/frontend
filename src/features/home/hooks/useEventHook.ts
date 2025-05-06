import { useQuery } from '@tanstack/react-query';
import { getEventByTag } from '../../../entities/event/api/event';
import { EventItem } from '../../../entities/event/model/event';

export const useLatestEvents = () => {
  return useQuery<{result: EventItem[]}>({
    queryKey: ['events', 'latest'],
    queryFn: () => getEventByTag('current', { page: 0, size: 10 }),
  });
};

export const useTrendingEvents = () => {
  return useQuery<{result: EventItem[]}>({
    queryKey: ['events', 'trending'],
    queryFn: () => getEventByTag('popular', { page: 0, size: 10 }),
  });
};

export const useClosingSoonEvents = () => {
  return useQuery<{result: EventItem[]}>({
    queryKey: ['events', 'closing'],
    queryFn: () => getEventByTag('deadline', { page: 0, size: 10 }),
  });
};
