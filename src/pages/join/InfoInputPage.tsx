import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../../design-system/ui/Header';
import Button from '../../../design-system/ui/Button';
import UnderlineTextField from '../../../design-system/ui/textFields/UnderlineTextField';
import { FormData, zodValidation } from '../../shared/lib/formValidation';
import { useAgreeTerms, useSendCertificationCode, useUserInfo, useUserUpdate, useVerifyCertificationCode } from '../../features/join/hooks/useUserHook';
import useAuthStore from '../../app/provider/authStore';
import { formatPhoneNumber } from '../../shared/utils/phoneFormatter';
import { useAgreementStore } from '../../features/join/model/agreementStore';

const InfoInputPage = () => {
  const { data, isLoading } = useUserInfo();
  const { login, setName } = useAuthStore();
  const { mutate: updateUser } = useUserUpdate();
  const { mutate: sendCode } = useSendCertificationCode();
  const { mutate: verifyCode } = useVerifyCertificationCode();
  const [isVerified, setIsVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    ...zodValidation,
  });
  const navigate = useNavigate();

  const phoneValue = watch('phone');

  const { getAgreementStates } = useAgreementStore();
  const { mutate: agreeTerms } = useAgreeTerms();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };
  // 전화번호 인증
  const [isVerifyVisible, setIsVerifyVisible] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(0);
  //인증번호 발급
  const handlePhoneVerifyClick = () => {
    if (!phoneValue) {
      alert('연락처를 입력해주세요.');
      return;
    }
    //인증api호출
    sendCode({ phoneNumber: phoneValue }, {
      onSuccess: () => {
        setIsVerifyVisible(true);
        setTimer(180);
      }
    });
  };
  // 인증번호 확인
  const handleVerifySubmit = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }
    verifyCode({ phoneNumber: phoneValue, certificationCode: verificationCode }, {
      onSuccess: () => {
        setIsVerifyVisible(false);
        setIsVerified(true);
      }
    });
  };

  useEffect(() => {
    if (isVerifyVisible && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVerifyVisible, timer]);
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const onSubmit: SubmitHandler<FormData> = formData => {
    const agreementStates = getAgreementStates();
    const updatedData = {
      name: formData.name,
      email: data?.email || '',
      phoneNumber: formData.phone,
    };
    updateUser(updatedData, {
      onSuccess: () => {
        agreeTerms(
          {
            serviceAgreed: agreementStates.serviceAgreed,
            privacyPolicyAgree: agreementStates.privacyPolicyAgree,
            personalInfoUsageAgreed: agreementStates.personalInfoUsageAgreed,
            marketingAgreed: agreementStates.marketingAgreed,
          },
          {
            onSuccess: () => {
              login();
              setName(formData.name);
              alert('회원가입이 완료되었습니다.');
              navigate('/');
            },
          }
        );
      },
      onError: () => {
        alert('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };
  useEffect(() => {
    if (data) {
      const trimmedName = data.name ? data.name.slice(0, 10) : '';
      reset({
        name: trimmedName || '',
        email: data.email || '',
        phone: '',
      });
    }
  }, [data, reset]);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <div className="relative flex flex-col w-full h-screen border ">
      <Header
        centerContent="정보입력"
        leftButtonLabel="<"
        leftButtonClassName="text-2xl z-30 font-semibold"
        leftButtonClick={() => navigate(-1)}
        color="black"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-10 py-12 md:px-12 md:py-16">
        {/* 이름 필드 */}
        <UnderlineTextField
          label="이름"
          placeholder="이름"
          errorMessage={errors.name?.message}
          className="text-xl"
          {...register('name')}
        />

        {/* 연락처 필드 */}
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <UnderlineTextField
              label="연락처"
              placeholder="연락처"
              type="tel"
              errorMessage={errors.phone?.message}
              className="text-xl"
              value={phoneValue}
              onChange={handlePhoneChange}
            />
          </div>
          <Button
            type='button'
            label="인증하기"
            onClick={handlePhoneVerifyClick}
            className="h-11 md:h-11 sm:h-8 px-4 rounded-md"
          />
        </div>

        {/* 인증번호 입력 필드 */}
        {isVerifyVisible && (
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <UnderlineTextField
                  placeholder="인증번호 6자리"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-xl"
                  label=""
                />
              </div>
              <Button
                type='button'
                label="인증확인"
                onClick={handleVerifySubmit}
                className="h-11 md:h-11 sm:h-8 px-4 rounded-md"
              />
            </div>
            <span className="text-sm text-gray-500 pl-1">남은 시간: {formatTime(timer)}</span>
          </div>
        )}
        {/* 이메일 필드 */}
        <UnderlineTextField
          label="이메일"
          placeholder="이메일"
          type="email"
          errorMessage={errors.email?.message}
          className="text-xl"
          readOnly
          {...register('email')}
        />
      </form>
      <div className="flex flex-grow" />
      <div className="w-full px-5 py-10">
        <Button
          label="시작하기"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isVerified}
          className="w-full h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default InfoInputPage;