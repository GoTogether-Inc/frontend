import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getEventInfo } from '../api/event';

export const useGetEventHook = () => {
  const { id } = useParams();

  const { data: eventInfo } = useQuery({
    queryKey: ['eventInfo', id],
    queryFn: () => getEventInfo(id),
    select: data => data.result,
  });

  return { eventInfo };
};
