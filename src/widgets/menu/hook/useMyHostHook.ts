import { useQuery } from '@tanstack/react-query';
import { MyHostResponse } from '../model/myHost';
import { AxiosError } from 'axios';
import myHost from '../api/myHost';

export const useMyHost = () => {
  const { data } = useQuery<MyHostResponse, AxiosError>({
    queryKey: ['myHost'],
    queryFn: myHost,
  });

  return { data };
};
