import { axiosClient } from '../../../shared/types/api/http-client';
import { HostInvitationRequest } from '../model/hostInvitation';

export const inviteMember = async (hostChannelId: number, data: HostInvitationRequest) => {
  const response = await axiosClient.post(`/host-channels/${hostChannelId}/members`, data);
  return response.data;
};
