import { useMutation } from '@tanstack/react-query';
import { HostInvitationRequest, HostInvitationResponse } from '../model/hostInvitation';
import { inviteMember } from '../api/hostInvitation';
import { AxiosError } from 'axios';

export const useHostInvitation = (hostChannelId: number) => {
  return useMutation<HostInvitationResponse, AxiosError<HostInvitationResponse>, HostInvitationRequest>({
    mutationFn: async (requestBody: HostInvitationRequest) => {
      return await inviteMember(hostChannelId, requestBody);
    },
  });
};
