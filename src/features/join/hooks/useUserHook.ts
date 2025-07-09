import { useMutation, useQuery } from '@tanstack/react-query';
import { agreeTerms, readUser, sendCertificationCode, updateUser, verifyCertificationCode } from '../api/user';
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


// 인증번호 발급
export const useSendCertificationCode = () => {
  return useMutation({
    mutationFn: (phoneNum: string) => sendCertificationCode(phoneNum),
    onSuccess: () => {
      alert('인증번호를 발송했습니다.');
    },
    onError: () => {
      alert('인증번호 전송에 실패했습니다.');
    },
  });
};

// 인증번호 확인 
export const useVerifyCertificationCode = () => {
  return useMutation({
    mutationFn: (params: { phoneNum: string; certificationCode: string }) =>
      verifyCertificationCode(params.phoneNum, params.certificationCode),
    onSuccess: () => {
      alert('인증에 성공했습니다.');
    },
    onError: () => {
      alert('인증번호가 일치하지 않습니다.');
    },
  });
}