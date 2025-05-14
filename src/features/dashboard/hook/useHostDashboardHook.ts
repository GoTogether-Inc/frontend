import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { HostDashboardResponse } from '../../../entities/host/model/hostDashboard';
import { getHostDashboard } from '../api/hostDashboard';

export const useGetEventHook = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data: eventInfo } = useQuery<HostDashboardResponse>({
    queryKey: ['eventInfo', eventId],
    queryFn: () => getHostDashboard(eventId),
  });

  return { eventInfo };
};
