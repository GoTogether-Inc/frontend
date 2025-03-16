import { useQuery } from '@tanstack/react-query';
import hostChannelList from '../api/hostChannelList';
import { AxiosError } from 'axios';
import { HostChannelListResponse } from '../model/hostChannelList';

const useHostChannelList = () => {
  const { data, isLoading, error } = useQuery<HostChannelListResponse, AxiosError>({
    queryKey: ['hostChannelList'],
    queryFn: hostChannelList,
  });

  return { data, isLoading, error };
};

export default useHostChannelList;
