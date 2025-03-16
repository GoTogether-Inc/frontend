import { useMutation } from '@tanstack/react-query';
import { createHost, deleteHost } from '../api/host';
import { HostCreationRequest } from '../model/hostCreation';
import { ApiResponse } from '../../../../shared/types/api/apiResponse';

export const useHostCreation = () => {
  return useMutation<ApiResponse<null>, Error, HostCreationRequest>({
    mutationFn: async (requestBody: HostCreationRequest) => {
      return await createHost(requestBody);
    },
  });
};

export const useHostDeletion = () => {
  return useMutation<ApiResponse<null>, Error, number>({
    mutationFn: async (hostChannelId: number) => {
      return await deleteHost(hostChannelId);
    },
  });
};
