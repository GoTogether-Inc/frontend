import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse } from './apiResponse';

export const axiosClient = axios.create({
  baseURL: '/api/v1',
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

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.method === 'post' || response.config.method === 'put') {
      console.log('서버로 전송된 데이터:', JSON.parse(response.config.data));
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
      localStorage.removeItem('access_token');
      window.location.href = '/login'; // 로그인 페이지로 이동
    }

    return Promise.reject(errorInfo);
  }
);
