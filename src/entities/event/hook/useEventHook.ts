import { useMutation, useQuery } from '@tanstack/react-query';
import { eventDeletion, eventDetail } from '../api/event';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../../../features/join/hooks/useUserHook';
import { ApiResponse } from '../../../shared/types/api/apiResponse';

export const useEventDetail = () => {
  const { id } = useParams();
  const { data: user } = useUserInfo();

  const eventId = Number(id);

  const { data } = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => eventDetail({ eventId, userId: user?.id }),
    enabled: !!user?.id && !!eventId,
  });

  return { data };
};

export const useEventDeletion = () => {
  return useMutation<ApiResponse<null>, Error, number>({
    mutationFn: async (eventId: number) => {
      return await eventDeletion(eventId);
    },
  });
};
