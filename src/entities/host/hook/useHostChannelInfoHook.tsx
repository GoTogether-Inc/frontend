import { useQuery } from '@tanstack/react-query';
import hostChannelInfo from '../api/hostChannelInfo';

const useHostChannelInfo = (hostChannelId: number) => {
  const { data } = useQuery({
    queryKey: ['hostInfo', hostChannelId],
    queryFn: () => hostChannelInfo({ hostChannelId }),
    enabled: !!hostChannelId,
  });
  return { data };
};
export default useHostChannelInfo;
