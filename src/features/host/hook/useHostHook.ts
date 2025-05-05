import { useMutation } from '@tanstack/react-query';
import updateHostInfo from '../api/host';
import { UpdateHostChannelInfoRequest } from '../model/host';

export const useUpdateHostChannelInfo = (hostChannelId: number) => {
  const mutation = useMutation({
    mutationFn: (dto: UpdateHostChannelInfoRequest) => updateHostInfo(hostChannelId, dto),
  });
  return mutation;
};
