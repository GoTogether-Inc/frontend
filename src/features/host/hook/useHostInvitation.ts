import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { HostInvitationRequest } from '../model/hostInvitation';
import { inviteMember } from '../api/hostInvitation';

export const useHostInvitation = (hostChannelId: number) => {
  return useMutation<ApiResponse<null>, Error, HostInvitationRequest>({
    mutationFn: async (requestBody: HostInvitationRequest) => {
      return await inviteMember(hostChannelId, requestBody);
    },
  });
};
