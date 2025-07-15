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
        new Promise<void>((resolve, reject) => {
          inviteMember(
            { email },
            {
              onSuccess: () => resolve(),
              onError: error => reject(error),
            }
          );
        })
    );

    Promise.allSettled(invitationPromises).then(results => {
      const failed = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[];

      if (failed.length > 0) {
        console.log('🚨 first error:', failed[0].reason);
      }

      if (failed.length === 0) {
        alert('초대가 전송되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['hostInfo', hostChannelId] });
        onSuccess?.();
        return;
      }

      const firstError = failed[0].reason;

      const errorMessage =
        firstError?.response?.data?.message || // AxiosError일 경우
        firstError?.message || // 일반 에러 객체일 경우
        '알 수 없는 오류가 발생했습니다.';

      alert(errorMessage);
      onError?.();
    });
  };

  return { inviteMembers };
};
