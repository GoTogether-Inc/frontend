import { useMutation } from '@tanstack/react-query';
import { HostCreationRequest, UpdateHostChannelInfoRequest } from '../model/host';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { createHost, deleteHost, updateHostInfo } from '../api/host';

export const useHostCreation = () => {
  return useMutation<ApiResponse<null>, Error, HostCreationRequest>({
    mutationFn: async (requestBody: HostCreationRequest) => {
      return await createHost(requestBody);
    },
  });
};

export const useUpdateHostChannelInfo = (hostChannelId: number) => {
  const mutation = useMutation({
    mutationFn: (dto: UpdateHostChannelInfoRequest) => updateHostInfo(hostChannelId, dto),
  });
  return mutation;
};

export const useHostDeletion = () => {
  return useMutation<ApiResponse<null>, Error, number>({
    mutationFn: async (hostChannelId: number) => {
      return await deleteHost(hostChannelId);
    },
  });
};
