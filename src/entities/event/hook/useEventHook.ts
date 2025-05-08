import { useQuery } from '@tanstack/react-query';
import { eventDetail } from '../api/event';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../../../features/join/hooks/useUserHook';

const useEventDetail = () => {
  const { id } = useParams();
  const { data: user } = useUserInfo();

  const eventId = Number(id);

  const { data } = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => eventDetail({ eventId, userId: user?.id  }),
    enabled: !!user?.id, 
  });

  return { data };
};
export default useEventDetail;
