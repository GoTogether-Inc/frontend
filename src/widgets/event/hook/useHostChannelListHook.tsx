import { useQuery } from '@tanstack/react-query';
import hostChannelList from '../api/hostChannelList';
import { AxiosError } from 'axios';
import { HostChannelListResponse } from '../model/hostChannelList';

const useHostChannelList = () => {
  const { data } = useQuery<HostChannelListResponse, AxiosError>({
    queryKey: ['hostChannelList'],
    queryFn: hostChannelList,
  });

  return { data };
};

export default useHostChannelList;
