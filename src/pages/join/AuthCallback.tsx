import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../app/provider/authStore';
import { useEffect, useRef } from 'react';
import { useUserInfo } from '../../features/join/hooks/useUserHook';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // 'new' or 'existing' or 'duplicatedEmail'
  const { login, setName, closeModal } = useAuthStore();
  const { data } = useUserInfo();
  const alreadyHandled = useRef(false);

  useEffect(() => {
    if (alreadyHandled.current) return;
    alreadyHandled.current = true;

    const handleAuth = async () => {
      try {
        closeModal();
        if (status === 'duplicatedEmail') {
          alert('이미 가입된 이메일 입니다. 다른 이메일을 사용해주세요.');
          navigate('/');
          return;
        }
        if (status === 'new') {
          navigate('/join/agreement');
        } else if (status === 'existing') {
          if (!data) return;
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
