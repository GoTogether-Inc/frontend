import { axiosClient } from './http-client';
import useAuthStore from '../../../app/provider/authStore';

// 타입 가드 함수
function isTokenError(error: unknown): error is { code: string; status?: number } {
  return error !== null && typeof error === 'object' && 'code' in error && typeof (error as any).code === 'string';
}

// 토큰 유효성 검증 함수 (httpOnly 쿠키 사용)
export const validateToken = async (): Promise<boolean> => {
  try {
    // 토큰 유효성 검증을 위한 API 호출 (사용자 정보 조회)
    await axiosClient.get('/users');
    return true;
  } catch (error: unknown) {
    // 토큰이 만료되었거나 유효하지 않은 경우
    if (isTokenError(error) && (error.code === 'TOKEN4001' || error.code === 'TOKEN4004' || error.status === 401)) {
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
    // Zustand persist가 자동으로 localStorage를 정리하므로 수동 정리 불필요
    authStore.logout();
    authStore.openModal();
  }
};
