import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../../design-system/ui/Header';
import Button from '../../../design-system/ui/Button';
import UnderlineTextField from '../../../design-system/ui/textFields/UnderlineTextField';
import { useNavigate } from 'react-router-dom';
import { FormData, zodValidation } from '../../shared/lib/formValidation';
import { useUserInfo, useUserUpdate } from '../../features/join/hooks/useUserHook';
import useAuthStore from '../../app/provider/authStore';
import { useEffect } from 'react';

const InfoInputPage = () => {
  const { data, isLoading } = useUserInfo();
  const { login, setName } = useAuthStore();
  const { mutate: updateUser } = useUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
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

  const onSubmit: SubmitHandler<FormData> = formData => {
    const updatedData = {
      id: data?.id || 0,
      name: data?.name || "",
      email: data?.email || "",
      phoneNumber: formData.phone,
    };
    updateUser(updatedData, {
      onSuccess: () => {
        login();
        setName(data?.name || "사용자");
        alert('정보가 성공적으로 업데이트되었습니다.');
        navigate('/');
      },
      onError: (err) => {
        alert('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
        console.error(err);
      },
    });
  };
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || '',
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
        <UnderlineTextField
          label="연락처"
          placeholder={"전화번호를 010-1234-5678 형식으로 입력해주세요."}
          type="tel"
          errorMessage={errors.phone?.message}
          className="text-xl"
          {...register('phone')}
        />

        {/* 이메일 필드 */}
        <UnderlineTextField
          label="이메일"
          placeholder="이메일"
          type="email"
          errorMessage={errors.email?.message}
          className="text-xl"
          {...register('email')}
        />
      </form>
      <div className="flex flex-grow" />
      <div className="w-full px-5 py-10">
        <Button
          label="시작하기"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className="w-full h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default InfoInputPage;
