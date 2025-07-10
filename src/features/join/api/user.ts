import { axiosClient } from '../../../shared/types/api/http-client';
import { TermsAgreementRequest, UserInfoRequest, UserInfoResponse } from '../model/userInformation';

export const readUser = async (): Promise<UserInfoResponse> => {
  const response = await axiosClient.get<{ result: UserInfoResponse }>('/users', {
    headers: { isPublicApi: true },
  });
  return response.data.result;
};

export const updateUser = async (data: UserInfoRequest): Promise<UserInfoResponse> => {
  const response = await axiosClient.put<UserInfoResponse>('/users', data, {
    headers: { isPublicApi: true },
  });
  return response.data;
};

// 이용 약관
export const agreeTerms = async (data: TermsAgreementRequest) => {
  const response = await axiosClient.post('/terms', data, {
    headers: { isPublicApi: true },
  });
  return response.data;
};

//인증번호 발급
export const sendCertificationCode = async (data: { phoneNumber: string }) => {
  const response = await axiosClient.post('/sms/send', data, {
    headers: { isPublicApi: true },
  });
  return response.data;
};
//인증번호 검증 
export const verifyCertificationCode = async (data: {phoneNumber: string, certificationCode: string}) => {
  const response = await axiosClient.post('/sms/verify', data, {
    headers: { isPublicApi: true },
  });
  return response.data;
};