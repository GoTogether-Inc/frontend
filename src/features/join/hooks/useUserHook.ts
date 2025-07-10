import { useMutation, useQuery } from '@tanstack/react-query';
import { agreeTerms, readUser, sendCertificationCode, updateUser, verifyCertificationCode } from '../api/user';
import { UserInfoRequest, UserInfoResponse } from '../model/userInformation';
import { AxiosError } from 'axios';

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


// 인증번호 발급
export const useSendCertificationCode = () => {
  return useMutation({
    mutationFn: (data: { phoneNumber: string }) => sendCertificationCode(data),
    onSuccess: () => {
      alert('인증번호를 발송했습니다.');
    },
    onError: (error: AxiosError<any>) => {
      if (error.result) {
        const allMessages = Object.values(error.result).join('\n');
        alert(allMessages);
      } else {
        alert(error.message || '인증번호 발송에 실패하였습니다.');
      }
    },
  });
};

// 인증번호 확인 
export const useVerifyCertificationCode = () => {
  return useMutation({
    mutationFn: (params: { phoneNumber: string; certificationCode: string }) =>
      verifyCertificationCode(params),
    onSuccess: () => {
      alert('인증에 성공했습니다.');
    },
    onError: (error: AxiosError<any>) => {
      if (error.result) {
        const allMessages = Object.values(error.result).join('\n');
        alert(allMessages);
      } else {
        alert(error.message || '인증에 실패하였습니다.');
      }
    },
  });
}