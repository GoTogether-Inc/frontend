import { useMutation, useQuery } from '@tanstack/react-query';
import { getParticipants } from '../../../features/dashboard/api/participants';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { AxiosError } from 'axios';
import { approveParticipants } from '../../../features/dashboard/api/participants';
import { useParticipantStore } from '../model/ParticipantStore';

export const useParticipants = (tags = 'all', page = 0, size = 10) => {
  const { id } = useParams();
  const eventId = Number(id);

  const {
    data: participantInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['participants'],
    queryFn: () => getParticipants({ eventId, tags, page, size }),
  });

  return {
    participants: participantInfo || [],
    isLoading,
    error,
  };
};

export const useApproveParticipants = (orderId: number) => {
  const { toggleApproveParticipant } = useParticipantStore();

  return useMutation<ApiResponse<string>, AxiosError, { orderId: number }>({
    mutationFn: () => approveParticipants({ orderId }),
    onSuccess: () => {
      toggleApproveParticipant(orderId);
    },
  });
};
