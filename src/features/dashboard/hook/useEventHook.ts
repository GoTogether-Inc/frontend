import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getHostDashboard } from '../api/event';
import { dashboardData } from '../../../shared/types/dashboardType';

export const useGetEventHook = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data: eventInfo } = useQuery<dashboardData>({
    queryKey: ['eventInfo', eventId],
    queryFn: () => getHostDashboard(eventId),
  });

  return { eventInfo };
};
