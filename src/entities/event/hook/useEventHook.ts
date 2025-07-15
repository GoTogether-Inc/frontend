import { useMutation, useQuery } from '@tanstack/react-query';
import { eventDeletion, eventDetail } from '../api/event';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../../../features/join/hooks/useUserHook';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import useAuthStore from '../../../app/provider/authStore';
import { AxiosError } from 'axios';
import { EventDeletionResponse } from '../model/event';

export const useEventDetail = () => {
  const { id } = useParams();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const { data: user } = useUserInfo(isLoggedIn);

  const eventId = Number(id);

  const { data } = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => eventDetail({ eventId, userId: user?.id }),
    enabled: !!eventId,
    retry: false,
  });

  return { data };
};

export const useEventDeletion = () => {
  return useMutation<ApiResponse<null>, AxiosError<EventDeletionResponse>, number>({
    mutationFn: async (eventId: number) => {
      return await eventDeletion(eventId);
    },
    onError: error => {
      const code = error.response?.data?.code;

      if (code === 'EVENT4002') {
        const message = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
        alert(message);
      }
    },
  });
};
