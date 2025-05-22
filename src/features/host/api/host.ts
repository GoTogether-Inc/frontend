import { axiosClient } from '../../../shared/types/api/http-client';
import { HostCreationRequest, UpdateHostChannelInfoRequest } from '../model/host';

export const createHost = async (data: HostCreationRequest) => {
  const response = await axiosClient.post('/host-channels', data);
  return response.data;
};

export const updateHostInfo = async (hostChannelId: number, dto: UpdateHostChannelInfoRequest) => {
  const response = await axiosClient.put(`/host-channels/${hostChannelId}`, dto);
  return response.data;
};

export const deleteHost = async (hostChannelId: number) => {
  const response = await axiosClient.delete(`/host-channels/${hostChannelId}`);
  return response.data;
};
