import { axiosClient } from '../../../shared/types/api/http-client';
import { UpdateHostChannelInfoRequest } from '../model/host';

const updateHostInfo = async (hostChannelId: number, dto: UpdateHostChannelInfoRequest) => {
  const response = await axiosClient.put(`/host-channels/${hostChannelId}`, dto);
  return response.data;
};
export default updateHostInfo;
