import { useQuery } from '@tanstack/react-query';
import { getEventByTag } from '../../../entities/event/api/event';
import { EventItem } from '../../../entities/event/api/event';
import { TagType } from '../../../shared/types/baseEventType';

export const useLatestEvents = () => {
  return useQuery<EventItem[]>({
    queryKey: ['events', 'latest'],
    queryFn: () => getEventByTag('current' as TagType, { page: 0, size: 10 }),
  });
};

export const useTrendingEvents = () => {
  return useQuery<EventItem[]>({
    queryKey: ['events', 'trending'],
    queryFn: () => getEventByTag('popular' as TagType, { page: 0, size: 10 }),
  });
};

export const useClosingSoonEvents = () => {
  return useQuery<EventItem[]>({
    queryKey: ['events', 'closing'],
    queryFn: () => getEventByTag('deadline' as TagType, { page: 0, size: 10 }),
  });
};
