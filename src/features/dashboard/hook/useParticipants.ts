import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getParticipants } from '../../../features/dashboard/api/participants';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { AxiosError } from 'axios';
import { approveParticipants } from '../../../features/dashboard/api/participants';

export const useParticipants = (
  tags: string = 'all',
  page: number = 0,
  size: number = 10
) => {
  const { id } = useParams();
  const eventId = Number(id);

  const {
    data: participantInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['participants', eventId, tags, page, size],
    queryFn: () => getParticipants(eventId, tags, page, size),
    enabled: !!eventId,
  });

  return {
    participants: participantInfo || [],
    isLoading,
    error,
  };
};

export const useApproveParticipants = (orderId: number) => {

  const queryClient = useQueryClient();

  return useMutation<ApiResponse<string>, AxiosError, { orderId: number }>({
    mutationFn: () => approveParticipants({ orderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'participants',
      });
    },
  });
};
