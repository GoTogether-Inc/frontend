import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../app/provider/authStore';
import { useEffect } from 'react';
import { useUserInfo } from '../../features/join/hooks/useUserHook';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // 'new' or 'existing'
  const { login, setName, closeModal } = useAuthStore();
  const { data } = useUserInfo();

  useEffect(() => {
    const handleAuth = async () => {
      if (!data) return;
      try {
        closeModal();
        if (status === 'new') {
          navigate('/join/agreement');
        } else {
          login();
          setName(data?.name || '사용자');
          navigate('/');
        }
      } catch {
        navigate('/');
      }
    };
    handleAuth();
  }, [data, navigate, login, status, setName, closeModal]);

  return <div className="text-center mt-32 text-lg font-bold">로그인 중입니다...</div>;
};

export default AuthCallback;
