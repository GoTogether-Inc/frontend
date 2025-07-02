import { axiosClient } from './http-client';
import useAuthStore from '../../../app/provider/authStore';

// 토큰 유효성 검증 함수 (httpOnly 쿠키 사용)
export const validateToken = async (): Promise<boolean> => {
  try {
    // 토큰 유효성 검증을 위한 API 호출 (사용자 정보 조회)
    await axiosClient.get('/users');
    return true;
  } catch (error: any) {
    // 토큰이 만료되었거나 유효하지 않은 경우
    if (error.code === 'TOKEN4001' || error.code === 'TOKEN4004' || error.status === 401) {
      return false;
    }
    // 다른 에러의 경우 토큰이 유효하다고 간주
    return true;
  }
};

// 앱 시작 시 토큰 검증 및 자동 로그아웃
export const initializeAuth = async () => {
  const authStore = useAuthStore.getState();
  
  // 로그인 상태가 아닌 경우 검증하지 않음
  if (!authStore.isLoggedIn) {
    return;
  }

  const isValid = await validateToken();
  
  if (!isValid) {
    // 토큰이 유효하지 않으면 로그아웃 처리
    authStore.logout();
    localStorage.removeItem('auth-storage');
    authStore.openModal();
  }
};