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
      } catch (error: any) {
        // 토큰 만료로 인한 자동 로그아웃인지 확인
        if (error?.code === 'TOKEN4001' || error?.code === 'TOKEN4004') {
          // 토큰 만료로 인한 자동 로그아웃이므로 조용히 처리
          logout();
          navigate('/');
        } else {
          // 실제 로그아웃 실패
          console.error('로그아웃 실패:', error);
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
