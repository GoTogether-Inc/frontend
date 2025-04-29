import { useQuery } from '@tanstack/react-query';
import { eventDetail } from '../api/event';
import { useParams } from 'react-router-dom';

const useEventDetail = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data } = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => eventDetail({ eventId }),
  });

  return { data };
};
export default useEventDetail;
