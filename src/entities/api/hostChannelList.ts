import { axiosClient } from '../../shared/types/api/http-client';
import { HostChannelListResponse } from '../model/hostChannelList';

const hostChannelList = async () => {
  const response = await axiosClient.get<HostChannelListResponse>(`/host-channels`, {
    params: {
      page: 0,
      size: 10,
    },
  });
  return response.data;
};

export default hostChannelList;
