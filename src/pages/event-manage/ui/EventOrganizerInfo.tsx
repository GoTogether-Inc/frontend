import React from 'react';
import Input from '../../../../design-system/ui/Input';
import { useForm } from 'react-hook-form';
import { validations } from '../../../shared/utils/validation';

interface FormInputs {
  email: string;
  phone: string;
}

const EventOrganizerInfo: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const phoneValue = watch('phone');
  const emailValue = watch('email');

  // 버튼 활성화 조건
  const isButtonEnabled = phoneValue && emailValue && isValid;

  // 디버깅 추가
  console.log('email:', emailValue, errors.email?.message);
  console.log('phone:', phoneValue, errors.phone?.message);
  console.log('isValid:', isValid);
  console.log('isButtonEnabled:', isButtonEnabled);

  return (
    <div className="flex flex-col space-y-4 p-5">
      <Input
        label="이메일"
        placeholder="이메일"
        type="email"
        error={errors.email?.message}
        className="w-full"
        {...register('email', { ...validations.email })}
      />
      <Input
        label="전화번호"
        placeholder={`"-" 없이 번호만 입력해주세요`}
        type="tel"
        error={errors.phone?.message}
        className="w-full"
        {...register('phone', { ...validations.phone })}
      />
    </div>
  );
};
export default EventOrganizerInfo;
