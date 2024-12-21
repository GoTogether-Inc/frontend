import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../../design-system/ui/Header';
import Button from '../../../design-system/ui/Button';
import Input from '../../../design-system/ui/Input';
import { validations } from '../../shared/lib/validation';

interface FormInputs {
  name: string;
  phone: string;
  email: string;
}

const existingNames = ['김원영']; // 중복 이름 예시
const existingPhones = ['01012345678']; // 중복 연락처 예시
const existingEmails = ['example@example.com']; // 중복 이메일 예시

const InfoInputPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const nameValue = watch('name');
  const phoneValue = watch('phone');
  const emailValue = watch('email');

  // 버튼 활성화 조건
  const isButtonEnabled = nameValue && phoneValue && emailValue && isValid;

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log('제출 데이터:', data);
    alert('정보 입력 완료!');
  };

  // 디버깅 추가
  console.log('name:', nameValue, errors.name?.message);
  console.log('phone:', phoneValue, errors.phone?.message);
  console.log('email:', emailValue, errors.email?.message);
  console.log('isValid:', isValid);
  console.log('isButtonEnabled:', isButtonEnabled);

  return (
    <div className="relative flex flex-col w-full h-screen border ">
      <Header title="정보입력" onBack={() => window.history.back()} textColor="text-black" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 m-20 mx-10 my-12 sm:mx-8 sm:my-10 md:mx-10 md:my-12 lg:mx-12 lg:my-16"
      >
        {/* 이름 필드 */}
        <Input
          label="이름"
          placeholder="이름"
          error={errors.name?.message}
          className="text-xl"
          {...register('name', {
            ...validations.name,
            validate: {
              notDuplicate: value => !existingNames.includes(value) || '이미 존재하는 이름입니다.',
            },
          })}
        />

        {/* 연락처 필드 */}
        <Input
          label="연락처"
          placeholder={`"-" 없이 번호만 입력해주세요`}
          type="tel"
          error={errors.phone?.message}
          className="text-xl"
          {...register('phone', {
            ...validations.phone,
            validate: {
              notDuplicate: value => !existingPhones.includes(value) || '이미 존재하는 연락처입니다.',
            },
          })}
        />

        {/* 이메일 필드 */}
        <Input
          label="이메일"
          placeholder="이메일"
          type="email"
          error={errors.email?.message}
          className="text-xl"
          {...register('email', {
            ...validations.email,
            validate: {
              notDuplicate: value => !existingEmails.includes(value) || '이미 존재하는 이메일입니다.',
            },
          })}
        />
      </form>
      <Button
        label="시작하기"
        onClick={handleSubmit(onSubmit)}
        disabled={!isButtonEnabled}
        className="absolute h-14 sm:h-12 md:h-14 lg:h-14 max-w-90 bottom-16 left-0 right-0 mx-10 sm:mx-8 md:mx-10 lg:mx-12 rounded-[150px]"
      />
    </div>
  );
};

export default InfoInputPage;
