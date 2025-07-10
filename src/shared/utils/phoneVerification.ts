import { useState, useEffect } from 'react';
import { useSendCertificationCode, useVerifyCertificationCode } from '../../features/join/hooks/useUserHook';

export const usePhoneVerification = () => {
  const { mutate: sendCode } = useSendCertificationCode();
  const { mutate: verifyCode } = useVerifyCertificationCode();

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifyVisible, setIsVerifyVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(0);
const resetVerification = () => {
    setIsVerified(false);
    setIsVerifyVisible(false);
    setVerificationCode('');
    setTimer(0);
  };
  // 인증번호 발송
  const requestVerificationCode = (phone: string) => {
    if (!phone) {
      alert('연락처를 입력해주세요.');
      return;
    }

    sendCode(
      { phoneNumber: phone },
      {
        onSuccess: () => {
          setIsVerifyVisible(true);
          setTimer(180);
        },
      }
    );
  };

  // 인증번호 확인
  const submitVerificationCode = (phone: string) => {
    if (!verificationCode || verificationCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }

    verifyCode(
      { phoneNumber: phone, certificationCode: verificationCode },
      {
        onSuccess: () => {
          setIsVerifyVisible(false);
          setIsVerified(true);
        },
      }
    );
  };

  // 타이머 로직
  useEffect(() => {
    if (isVerifyVisible && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isVerifyVisible && timer === 0) {
      alert('인증 시간이 만료되었습니다. 다시 인증해주세요.');
      setIsVerifyVisible(false);
    }
  }, [isVerifyVisible, timer]);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return {
    isVerified,
    isVerifyVisible,
    verificationCode,
    setVerificationCode,
    timer,
    formatTime,
    requestVerificationCode,
    submitVerificationCode,
    setIsVerified,
    setIsVerifyVisible,
    resetVerification
  };
};
