import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse } from './apiResponse';
import Cookies from 'js-cookie';
import useAuthStore from '../../../app/provider/authStore';

export const axiosClient = axios.create({
  baseURL: 'http://ec2-3-35-48-123.ap-northeast-2.compute.amazonaws.com:8080/api/v1',
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    //Authorization: `Bearer `,
  },
});

axiosClient.interceptors.request.use(
  config => {
    //const token = Cookies.get('access_token');
    //zustand 사용함으로써 코드변경 할 듯 현재는 임시 입니다.
    // const token = useAuthStore.getState().accessToken;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.method === 'post' || response.config.method === 'put') {
      if (response.config.data) {
        console.log('서버로 전송된 데이터:', JSON.parse(response.config.data));
      }
    }
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const errorInfo = {
      status: error.response?.status || 'NETWORK_ERROR',
      message: error.response?.data?.message || error.message,
    };

    // 401(토큰 만료)일 경우 로그아웃 처리 or 토큰 갱신 가능
    if (errorInfo.status === 401) {
      Cookies.remove('access_token');

      useAuthStore.getState().openModal();
    }

    return Promise.reject(errorInfo);
  }
);
