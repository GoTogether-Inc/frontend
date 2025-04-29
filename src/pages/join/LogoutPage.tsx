import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../shared/types/api/http-client';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosClient.post('/oauth/logout');
        navigate('/');
      } catch (error) {
        console.error('로그아웃 실패:', error);
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    };
    logout();
  }, [navigate]);

  return <div>로그아웃 중...</div>;
};

export default LogoutPage;
