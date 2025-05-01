import { useQuery } from '@tanstack/react-query';
import { getEventByTag } from '../../../entities/event/api/event';
import { EventResponse } from '../model/eventResponse';

export const useLatestEvents = () => {
  return useQuery<EventResponse>({
    queryKey: ['events', 'latest'],
    queryFn: () => getEventByTag('current', { page: 0, size: 10 }),
  });
};

export const useTrendingEvents = () => {
  return useQuery<EventResponse>({
    queryKey: ['events', 'trending'],
    queryFn: () => getEventByTag('popular', { page: 0, size: 10 }),
  });
};

export const useClosingSoonEvents = () => {
  return useQuery<EventResponse>({
    queryKey: ['events', 'closing'],
    queryFn: () => getEventByTag('deadline', { page: 0, size: 10 }),
  });
};
