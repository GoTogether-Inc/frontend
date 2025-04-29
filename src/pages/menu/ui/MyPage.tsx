import { useEffect, useState } from 'react';
import Header from '../../../../design-system/ui/Header';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import PaymentCard from '../../../widgets/payment/ui/PaymentCard';
import { myPageSchema } from '../../../shared/lib/formValidation';
import { useUserInfo,useUserUpdate } from '../../../features/join/hooks/useUserHook';
import useAuthStore from '../../../app/provider/authStore';

const MyPage = () => {
  const {data, isLoading, error} = useUserInfo();
  const { mutate: updateUser } = useUserUpdate();
  const { setName } = useAuthStore();

  const [isChanged, setIsChanged] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { name: data?.name || '', phone: data?.phoneNumber || ''},
    ...myPageSchema,
  });
  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('phone', data.phoneNumber);
    }
  }, [data, setValue]);

  const onSubmit:  SubmitHandler<{ name: string; phone: string }> = (formData) => {
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
        alert('정보가 성공적으로 업데이트되었습니다.');
      },
      onError: (err) => {
        alert('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
        console.error(err);
      },
    });
    // 이름과 전화번호가 변경되었는지 확인하고 메시지 설정
    let changeMessage = '';
    if (name !== data?.name && phone !== data?.phoneNumber) {
      changeMessage = `${name}, ${phone}으로 변경되었습니다`;
    } else if (name !== data?.name) {
      changeMessage = `${name}으로 변경되었습니다`;
    } else if (phone !== data?.phoneNumber) {
      changeMessage = `${phone}으로 변경되었습니다`;
    }

    setIsChanged(changeMessage); // 변경 상태 업데이트

  };
  if (isLoading) {
    return <div>로딩 중...</div>; 
  }
  if (error) {
    return <div>정보를 불러오는데 실패했습니다. 다시 시도해주세요.</div>;
  }
  return (
    <div>
      <Header leftButtonLabel="마이페이지" leftButtonClassName="font-bold text-2xl" />
      <div className="flex flex-col px-5 mt-8 md:mt-10 gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">기본 정보</h1>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-normal">이메일</span>
            <span className="text-sm md:text-base font-light">{data?.email}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <DefaultTextField
                label="이름"
                placeholder={data?.name}
                className=" h-8"
                labelClassName="text-sm md:text-base font-normal"
                {...register('name')}
              />
              {errors.name && <span className=" text-sm text-red-500 whitespace-nowrap">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <DefaultTextField
                label="전화번호"
                placeholder={data?.phoneNumber}
                className="h-8"
                labelClassName="text-sm md:text-base font-normal"
                {...register('phone')}
              />
              {errors.phone && <span className="text-sm text-red-500 whitespace-nowrap">{errors.phone.message}</span>}
            </div>
          </div>
          {isChanged && <span className="text-red-500 text-sm">{isChanged}</span>}
          <TertiaryButton label="저장하기" color="black" size="large" type="submit" className="w-24 h-8" />
        </form>
      </div>
      <PaymentCard title={'등록된 카드'} />
      <BottomBar />
    </div>
  );
};
export default MyPage;
