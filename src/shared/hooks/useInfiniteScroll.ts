import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationParams, EventFilters } from '../../entities/event/model/event';

interface UseInfiniteScrollProps<T> {
  queryKey: string[];
  queryFn: (params: PaginationParams & EventFilters) => Promise<{
    items: T[];
    hasNextPage: boolean;
  }>;
  size?: number;
  filters?: EventFilters;
}

export const useInfiniteScroll = <T>({ queryKey, queryFn, size = 10, filters }: UseInfiniteScrollProps<T>) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => queryFn({ page: pageParam, size, ...filters }),
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNextPage ? allPages.length : undefined),
    initialPageParam: 0,
  });
};
