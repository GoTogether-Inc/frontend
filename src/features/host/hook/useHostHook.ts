import { useMutation } from '@tanstack/react-query';
import { HostCreationRequest, HostDeletionResponse, UpdateHostChannelInfoRequest } from '../model/host';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { createHost, deleteHost, updateHostInfo } from '../api/host';
import { AxiosError } from 'axios';

export const useHostCreation = () => {
  return useMutation<ApiResponse<null>, Error, HostCreationRequest>({
    mutationFn: async (requestBody: HostCreationRequest) => {
      return await createHost(requestBody);
    },
    onError: error => {
      console.log('error', error.message);
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
  return useMutation<ApiResponse<null>, AxiosError<HostDeletionResponse>, number>({
    mutationFn: async (hostChannelId: number) => {
      return await deleteHost(hostChannelId);
    },
    onError: error => {
      const code = error.response?.data?.code;

      if (code === 'HOST_CHANNEL4002' || code === 'HOST_CHANNEL4005') {
        const message = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
        alert(message);
      }
    },
  });
};
