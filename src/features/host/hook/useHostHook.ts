import { useMutation } from '@tanstack/react-query';
import updateHostInfo from '../api/host';
import { UpdateHostChannelInfoRequest } from '../model/host';
import { useParams } from 'react-router-dom';

export const useUpdateHostChannelInfo = () => {
  const { id } = useParams();
  const hostChannelId = Number(id);

  const mutation = useMutation({
    mutationFn: (dto: UpdateHostChannelInfoRequest) => updateHostInfo(hostChannelId, dto),
  });
  return mutation;
};
