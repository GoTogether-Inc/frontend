import { useQuery } from '@tanstack/react-query';
import hostDetail from '../api/hostDetail';

const useHostDetail = (hostChannelId: number) => {
  const { data } = useQuery({
    queryKey: ['hostDetail', hostChannelId],
    queryFn: () => hostDetail({ hostChannelId }),
    enabled: !!hostChannelId,
  });

  return { data };
};

export default useHostDetail;
