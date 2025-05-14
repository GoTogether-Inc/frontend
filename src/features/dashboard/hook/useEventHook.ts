import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getHostDashboard, updateEventInfo } from '../api/event';
import { UpdateEventRequest } from '../model/event';
import { HostDashboardResponse } from '../../../entities/host/model/hostDashboard';

export const useGetEventHook = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data: eventInfo } = useQuery<HostDashboardResponse>({
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
