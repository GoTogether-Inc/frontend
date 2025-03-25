import { useQuery } from '@tanstack/react-query';
import { getParticipants } from '../../../features/dashboard/api/participants';
import { useParams } from 'react-router-dom';

export const useParticipants = (tags = 'all', page = 1, size = 10) => {
  const { Id } = useParams();
  const eventId = Number(Id);

  const {
    data: participantInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['participants', eventId, tags, page, size],
    queryFn: () => getParticipants({ eventId, tags, page, size }),
  });

  return {
    participants: participantInfo || [],
    isLoading,
    error,
  };
};
