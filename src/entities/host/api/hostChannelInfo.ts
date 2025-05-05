import { axiosClient } from '../../../shared/types/api/http-client';
import { HostChannelInfoRequest, HostChannelInfoResponse } from '../model/hostChannelInfo';

const hostChannelInfo = async (dto: HostChannelInfoRequest) => {
  const response = await axiosClient.get<HostChannelInfoResponse>(`/host-channels/${dto.hostChannelId}/info`);
  return response.data;
};
export default hostChannelInfo;
