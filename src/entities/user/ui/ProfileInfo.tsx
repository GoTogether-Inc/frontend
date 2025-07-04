import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { myPageSchema } from '../../../shared/lib/formValidation';
import { formatPhoneNumber } from '../../../shared/utils/phoneFormatter';
import ProfileCircle from '../../../../design-system/ui/Profile';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import useAuthStore from '../../../app/provider/authStore';
import { useUserInfo, useUserUpdate } from '../../../features/join/hooks/useUserHook';

const ProfileInfo = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const { setName } = useAuthStore();
  const { data, isLoading, error, refetch } = useUserInfo(isLoggedIn);
  const { mutate: updateUser } = useUserUpdate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ name: string; phone: string }>({
    defaultValues: { name: data?.name || '', phone: data?.phoneNumber || '' },
    resolver: zodResolver(myPageSchema),
  });

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
    const updatedData = {
      id: data?.id || 0,
      name: name || '',
      email: data?.email || '',
      phoneNumber: phone || '',
    };

    updateUser(updatedData, {
      onSuccess: () => {
        setName(name);
        refetch();
        setIsEditing(false);
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
                  name={data?.name?.slice(1, 3)}
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
                  name={data?.name?.slice(1, 3)}
                  className="w-16 h-16 md:w-18 md:h-18 text-xl md:text-2xl"
                />
                <div className="flex flex-col gap-1">
                  <DefaultTextField
                    {...register('name')}
                    errorPosition="right"
                    errorMessage={errors.name?.message}
                    className="h-9"
                  />
                  <DefaultTextField
                    {...register('phone')}
                    onChange={handlePhoneChange}
                    errorPosition="right"
                    errorMessage={errors.phone?.message}
                    className="h-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <TertiaryButton
                  label="취소하기"
                  type="button"
                  color="pink"
                  size="full"
                  onClick={() => {
                    setIsEditing(false);
                    setValue('name', data?.name || '');
                    setValue('phone', data?.phoneNumber || '');
                  }}
                />
                <TertiaryButton label="수정하기" type="submit" color="pink" size="full" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
