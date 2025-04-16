import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse } from './apiResponse';
import Cookies from 'js-cookie';
import useAuthStore from '../../../app/provider/authStore';

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
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
