import { useQuery } from '@tanstack/react-query';
import hostDashboard from '../api/hostDashboard';
import { useParams } from 'react-router-dom';

const useHostDashboard = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data, refetch } = useQuery({
    queryKey: ['hostDashboard', eventId],
    queryFn: () => hostDashboard(eventId!),
    enabled: !!eventId,
  });

  return { data, refetch };
};

export default useHostDashboard;
