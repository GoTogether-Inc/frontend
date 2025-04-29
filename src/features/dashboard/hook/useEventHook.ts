import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getHostDashboard, updateEventInfo } from '../api/event';
import { dashboardData } from '../../../shared/types/dashboardType';
import { UpdateEventRequest } from '../model/event';

export const useGetEventHook = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data: eventInfo } = useQuery<dashboardData>({
    queryKey: ['eventInfo', eventId],
    queryFn: () => getHostDashboard(eventId),
  });

  return { eventInfo };
};

export const useUpdateEventHook = () => {
  const { id } = useParams();
  const eventId = Number(id);

  const mutation = useMutation({
    mutationFn: (dto: Partial<UpdateEventRequest>) => updateEventInfo(eventId, dto),
  });

  return mutation;
};
