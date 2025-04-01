import { HostDetailResponse } from '../model/hostDetail';
import { axiosClient } from '../../../shared/types/api/http-client';
import { HostDetailRequest } from '../model/hostDetail';

const hostDetail = async (dto: HostDetailRequest) => {
  const response = await axiosClient.get<HostDetailResponse>(`/host-channels/${dto.hostChannelId}`);
  return response.data;
};

export default hostDetail;
