import { useMutation, useQuery } from '@tanstack/react-query';
import { readUser, updateUser } from '../api/user';
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
