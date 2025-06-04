import { axiosClient } from '../../../shared/types/api/http-client';
import { TermsAgreementRequset, UserInfoRequest, UserInfoResponse } from '../model/userInformation';

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
export const agreeTerms = async (payload: TermsAgreementRequset) => {
  const response = await axiosClient.post('/terms', payload);
  return response.data;
};
