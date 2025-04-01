import { axiosClient } from '../../../shared/types/api/http-client';
import { MyHostResponse } from '../model/myHost';

const myHost = async () => {
  const response = await axiosClient.get<MyHostResponse>('/host-channels', {
    params: {
      page: 0,
      size: 10,
    },
  });
  return response.data;
};

export default myHost;
