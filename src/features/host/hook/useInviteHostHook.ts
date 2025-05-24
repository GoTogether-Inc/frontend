import { useQueryClient } from '@tanstack/react-query';
import { useHostInvitation } from './useHostInvitation';

export const useInviteMembers = (hostChannelId: number) => {
  const queryClient = useQueryClient();
  const { mutate: inviteMember } = useHostInvitation(hostChannelId);

  const inviteMembers = (emails: string[], onSuccess?: () => void, onError?: () => void) => {
    if (emails.length === 0) {
      alert('초대할 이메일을 입력해주세요.');
      return;
    }

    const invitationPromises = emails.map(
      email =>
        new Promise((resolve, reject) => {
          inviteMember(
            { email },
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        })
    );

    Promise.all(invitationPromises)
      .then(() => {
        alert('초대가 전송되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['hostInfo', hostChannelId] });
        onSuccess?.();
      })
      .catch(() => {
        alert('초대 중 일부 실패했습니다.');
        onError?.();
      });
  };

  return { inviteMembers };
};
