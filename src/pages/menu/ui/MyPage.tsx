import { useState } from 'react';
import Header from '../../../../design-system/ui/Header';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { useForm } from 'react-hook-form';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import PaymentCard from '../../../widgets/payment/ui/PaymentCard';
import { myPageSchema } from '../../../shared/lib/formValidation';

const MyPage = () => {
  const userData = { email: 'aaa@naver.com', name: '고예진', phone: '01012345678' };

  const [isChanged, setIsChanged] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { name: userData.name, phone: userData.phone },
    ...myPageSchema,
  });

  const handleSave = (data: { name: string; phone: string }) => {
    // 이름과 전화번호가 변경되었는지 확인하고 메시지 설정
    let changeMessage = '';
    if (data.name !== userData.name && data.phone !== userData.phone) {
      changeMessage = `${data.name}, ${data.phone}으로 변경되었습니다`;
    } else if (data.name !== userData.name) {
      changeMessage = `${data.name}으로 변경되었습니다`;
    } else if (data.phone !== userData.phone) {
      changeMessage = `${data.phone}으로 변경되었습니다`;
    }

    setIsChanged(changeMessage); // 변경 상태 업데이트
    setValue('name', data.name); // Reset name field value
    setValue('phone', data.phone);
  };
  return (
    <div>
      <Header leftButtonLabel="마이페이지" leftButtonClassName="font-bold text-2xl" />
      <div className="flex flex-col px-5 mt-8 md:mt-10 gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">기본 정보</h1>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-normal">이메일</span>
            <span className="text-sm md:text-base font-light">{userData.email}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <DefaultTextField
                label="이름"
                placeholder={userData.name}
                className=" h-8"
                labelClassName="text-sm md:text-base font-normal"
                {...register('name')}
              />
              {errors.name && <span className=" text-sm text-red-500 whitespace-nowrap">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <DefaultTextField
                label="전화번호"
                placeholder={userData.phone}
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
