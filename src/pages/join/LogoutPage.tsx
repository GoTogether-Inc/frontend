import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../shared/types/api/http-client';
import useAuthStore from '../../app/provider/authStore';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axiosClient.post('/oauth/logout');
        logout();
        navigate('/');
      } catch (error: unknown) {
        // 토큰 만료로 인한 자동 로그아웃인지 확인
        if (
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          ((error as { code?: string }).code === 'TOKEN4001' || (error as { code?: string }).code === 'TOKEN4004')
        ) {
          // 토큰 만료로 인한 자동 로그아웃이므로 조용히 처리
          alert('다시 로그인 해주세요.');
          logout();
          navigate('/');
        } else {
          // 실제 로그아웃 실패
          alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
          navigate('/menu');
        }
      }
    };
    handleLogout();
  }, [navigate, logout]);

  return <div>로그아웃 중...</div>;
};

export default LogoutPage;
