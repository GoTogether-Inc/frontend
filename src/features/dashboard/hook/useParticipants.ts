import { useQuery } from '@tanstack/react-query';
import { getParticipants } from '../../../features/dashboard/api/participants';
import { useParams } from 'react-router-dom';

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
