import { useMutation, useQuery } from '@tanstack/react-query';
import { agreeTerms, readUser, updateUser } from '../api/user';
import { UserInfoRequest, UserInfoResponse } from '../model/userInformation';

export const useUserInfo = (enabled: boolean = true) => {
  return useQuery<UserInfoResponse>({
    queryKey: ['userInfo'],
    queryFn: readUser,
    enabled,
  });
};

export const useUserUpdate = () => {
  return useMutation<UserInfoResponse, Error, UserInfoRequest>({
    mutationFn: updateUser,
  });
};

export const useAgreeTerms = () => {
  return useMutation({
    mutationFn: agreeTerms,
    onSuccess: () => {
      alert('이용약관 동의 완료');
    },
    onError: () => {
      alert('동의 처리 실패');
    }
  });
};