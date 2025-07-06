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
    onError: (error) => {
      alert(error.message);
    }
  });
};

export const useAgreeTerms = () => {
  return useMutation({
    mutationFn: agreeTerms,
    onError: () => {
      alert('약관 동의 처리에 실패했습니다.');
    }
  });
};