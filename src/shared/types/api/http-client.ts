import axios, { AxiosError, AxiosResponse } from 'axios';
import { ENV } from '../../../config/env.config';
import { ApiErrorResponse } from './apiResponse';

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    //zustand 사용함으로써 코드변경 할 듯 현재는 임시 입니다.

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (ENV.IS_DEV) {
      console.log('[Request Config]:', config);
    }

    return config;
  },
  (error: AxiosError) => {
    if (ENV.IS_DEV) {
      console.error(`[Request Error]:`, error);
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (ENV.IS_DEV) {
      console.log('[Response Data]:', response.data);
    }
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const errorInfo = {
      status: error.response?.status || 'NETWORK_ERROR',
      message: error.response?.data?.message || error.message,
    };

    if (ENV.IS_DEV) {
      console.error(`[API Error - ${error.config?.url}]:`, errorInfo);
    }

    // 401(토큰 만료)일 경우 로그아웃 처리 or 토큰 갱신 가능
    if (errorInfo.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login'; // 로그인 페이지로 이동
    }

    return Promise.reject(errorInfo);
  }
);
