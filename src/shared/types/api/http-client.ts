import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
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
    if (config.headers?.isPublicApi) {
      return config;
    }

    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    // 로그인되지 않은 상태라면 요청 차단
    if (!isLoggedIn) {
      return Promise.reject({
        status: 401,
        message: '로그인이 필요합니다.',
        code: 'TOKEN_REQUIRED',
        config,
      });
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
      if (response.config.data) {
        console.log('서버로 전송된 데이터:', JSON.parse(response.config.data));
      }
    }
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const errorInfo = {
      status: error.response?.status || 'NETWORK_ERROR',
      message: error.response?.data?.message || error.message,
      code: error.response?.data.code,
    };

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // 401(토큰 만료)일 경우 로그아웃 처리 or 토큰 갱신 가능
    if (errorInfo.code === 'TOKEN4001' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/oauth/reissue`,
          {},
          {
            withCredentials: true,
          }
        );
        // 새 토큰이 쿠키에 재설정되었으므로 원래 요청 재시도
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃 처리
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        const authStore = useAuthStore.getState();
        authStore.logout();
        authStore.openModal();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(errorInfo);
  }
);
