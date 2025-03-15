import { axiosClient } from '../../../../shared/types/api/http-client';
import { HostCreationRequest } from '../model/hostCreation';

const createHost = async (data: HostCreationRequest) => {
  const response = await axiosClient.post('/host-channels', data);
  return response.data;
};

export default createHost;
