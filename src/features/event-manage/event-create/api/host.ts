import { axiosClient } from '../../../../shared/types/api/http-client';
import { HostCreationRequest } from '../model/hostCreation';

export const createHost = async (data: HostCreationRequest) => {
  const response = await axiosClient.post('/host-channels', data);
  return response.data;
};

export const deleteHost = async (hostChannelId: number) => {
  const response = await axiosClient.delete(`/host-channels/${hostChannelId}`);
  return response.data;
};
