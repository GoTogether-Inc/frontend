import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../app/provider/authStore';
import { useEffect, useRef } from 'react';
import { useUserInfo } from '../../features/join/hooks/useUserHook';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // 'new', 'existing', 'duplicatedEmail'
  const { login, setName, closeModal } = useAuthStore();
  const { data } = useUserInfo();
  const alreadyHandled = useRef(false);

  useEffect(() => {
    if (alreadyHandled.current || !status) return;

    if (status === 'duplicatedEmail') {
      alreadyHandled.current = true;
      alert('이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.');
      navigate('/');
      return;
    }
    if (status === 'new') {
      alreadyHandled.current = true;
      closeModal();
      navigate('/join/agreement');
      return;
    }
    if (status === 'existing' && data) {
      alreadyHandled.current = true;
      closeModal();
      login();
      setName(data.name || '사용자');
      navigate('/');
      return;
    }
  }, [status, data, closeModal, login, setName, navigate]);

  return <div className="text-center mt-32 text-lg font-bold">로그인 중입니다...</div>;
};

export default AuthCallback;
