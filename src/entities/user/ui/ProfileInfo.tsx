import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { myPageSchema } from '../../../shared/lib/formValidation';
import { formatPhoneNumber } from '../../../shared/utils/phoneFormatter';
import ProfileCircle from '../../../../design-system/ui/Profile';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import useAuthStore from '../../../app/provider/authStore';
import { useUserInfo, useUserUpdate} from '../../../features/join/hooks/useUserHook';
import { formatProfilName } from '../../../shared/lib/formatProfileName';
import Button from '../../../../design-system/ui/Button';
import { usePhoneVerification } from '../../../shared/utils/phoneVerification';

const ProfileInfo = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const { setName } = useAuthStore();
  const { data, isLoading, error, refetch } = useUserInfo(isLoggedIn);
  const { mutate: updateUser } = useUserUpdate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    isVerified,
    isVerifyVisible,
    verificationCode,
    setVerificationCode,
    timer,
    formatTime,
    requestVerificationCode,
    submitVerificationCode,
    resetVerification,
  } = usePhoneVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<{ name: string; phone: string }>({
    defaultValues: { name: data?.name || '', phone: data?.phoneNumber || '' },
    resolver: zodResolver(myPageSchema),
  });

  const phoneValue = watch('phone');

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('phone', data.phoneNumber);
    }
  }, [data, setValue]);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<{ name: string; phone: string }> = formData => {
    const { name, phone } = formData;

    if (!data?.id) {
      alert('사용자 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      return;
    }

    const updatedData = {
      id: data.id,
      name: name,
      email: data.email,
      phoneNumber: phone,
    };

    updateUser(updatedData, {
      onSuccess: () => {
        setName(name);
        refetch();
        setIsEditing(false);
        alert('정보가 성공적으로 업데이트 되었습니다.')
      },
      onError: () => {
        alert('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };



  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>정보를 불러오는데 실패했습니다. 다시 시도해주세요.</div>;
  }
  return (
    <div className="relative w-full h-52 md:h-56">
      <div className="absolute inset-0 bg-main rounded-[10px]" />
      <div className="relative z-10 bg-dashboardBg rounded-[10px] p-5 ml-2 h-full">
        <div className="flex flex-col items-start h-full">
          <h1 className="text-20 md:text-22 font-bold">프로필 정보</h1>
          {!isEditing ? (
            <>
              <div className="flex items-center gap-3">
                <ProfileCircle
                  profile="userProfile"
                  name={formatProfilName(data?.name || '')}
                  className="w-16 h-16 md:w-18 md:h-18 text-xl md:text-2xl"
                />
                <div className="flex flex-col gap-1 py-5 md:py-7 mb-2">
                  <span className="text-17 md:text-19 font-bold">{data?.name}</span>
                  <span className="text-14 md:text-16 text-gray-500">{data?.phoneNumber}</span>
                </div>
              </div>
              <TertiaryButton
                label="수정하기"
                type="button"
                color="pink"
                size="full"
                onClick={() => setIsEditing(true)}
              />
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex py-2 md:py-3 gap-3">
                <ProfileCircle
                  profile="userProfile"
                  name={formatProfilName(data?.name || '')}
                  className="w-16 h-16 md:w-18 md:h-18 text-xl md:text-2xl"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <DefaultTextField
                    {...register('name')}
                    errorPosition="bottom"
                    errorMessage={errors.name?.message}
                    className="h-9"
                  />
                  <div className="flex gap-2 items-center">
                    <DefaultTextField
                      {...register('phone')}
                      onChange={handlePhoneChange}
                      className="h-9 flex-1"
                    />
                    <Button
                      type="button"
                      label="인증하기"
                      onClick={() => requestVerificationCode(phoneValue)}
                      className="h-9 sm:h-8 rounded-md w-24"
                    />
                  </div>

                  {isVerifyVisible && (
                    <div className="mt-3 p-4 bg-white rounded-md shadow-md border border-gray-300">
                      <div className="flex gap-2 mb-2">
                        <DefaultTextField
                          placeholder="인증번호 6자리"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="h-9 flex-1"
                        />
                        <Button
                          type="button"
                          label="확인"
                          onClick={() => submitVerificationCode(phoneValue)}
                          className="h-9 px-3 rounded-md"
                        />
                      </div>
                      <span className="text-xs text-gray-500 pl-1 mb-3 block">
                        남은 시간: {formatTime(timer)}
                      </span>
                      <TertiaryButton
                        label="취소하기"
                        type="button"
                        color="pink"
                        size="full"
                        onClick={() => {
                          setIsEditing(false);
                          setValue('name', data?.name || '');
                          setValue('phone', data?.phoneNumber || '');
                          resetVerification();
                          setVerificationCode('');
                        }}
                      />
                    </div>
                  )}

                  {!isVerifyVisible && (
                    <div className="flex gap-2 mt-2">
                      <TertiaryButton
                        label="취소하기"
                        type="button"
                        color="pink"
                        size="full"
                        onClick={() => {
                          setIsEditing(false);
                          setValue('name', data?.name || '');
                          setValue('phone', data?.phoneNumber || '');
                          resetVerification();
                          setVerificationCode('');
                        }}
                      />
                      <TertiaryButton
                        label="수정하기"
                        type="submit"
                        color="pink"
                        size="full"
                        disabled={
                          phoneValue !== data?.phoneNumber && !isVerified
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

};

export default ProfileInfo;
