import { useQueryClient } from '@tanstack/react-query';
import { useUpdateHostChannelInfo } from './useHostHook';
import { HostChannelInfoResponse } from '../../../entities/host/model/hostChannelInfo';

export const useHostInfoSave = (
  hostChannelId: number,
  hostInfo: HostChannelInfoResponse,
  channelDescription: string
) => {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateHostChannelInfo(hostChannelId);

  const handleSave = () => {
    if (!hostInfo?.result.id) return;

    const updatedData = {
      hostChannelId,
      profileImageUrl: hostInfo.result.profileImageUrl,
      hostChannelName: hostInfo.result.hostChannelName,
      hostEmail: hostInfo.result.email,
      channelDescription,
    };

    mutate(updatedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['hostInfo', hostChannelId] });
        alert('저장되었습니다.');
      },
      onError: () => {
        alert('저장에 실패했습니다.');
      },
    });
  };

  return { handleSave };
};
