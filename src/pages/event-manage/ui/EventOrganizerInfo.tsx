import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validations } from '../../../shared/lib/validation';
import { useFunnelStore } from '../../../features/event-manage/model/funnelStore';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';

interface FormInputs {
  email: string;
  phone: string;
}

const EventOrganizerInfo: React.FC = () => {
  const { data, updateFunnelData } = useFunnelStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const phoneValue = watch('phone');
  const emailValue = watch('email');

  useEffect(() => {
    if (emailValue !== data.organizerEmail || phoneValue !== data.organizerPhoneNumber) {
      updateFunnelData({
        organizerEmail: emailValue,
        organizerPhoneNumber: phoneValue,
      });
    }
  }, [emailValue, phoneValue, data, updateFunnelData]);

  return (
    <div className="flex flex-col space-y-4 p-5">
      <UnderlineTextField
        label="이메일"
        placeholder="이메일"
        type="email"
        errorMessage={errors.email?.message}
        className="w-full"
        {...register('email', { ...validations.email })}
      />
      <UnderlineTextField
        label="전화번호"
        placeholder={`"-" 없이 번호만 입력해주세요`}
        type="tel"
        errorMessage={errors.phone?.message}
        className="w-full"
        {...register('phone', { ...validations.phone })}
      />
    </div>
  );
};
export default EventOrganizerInfo;
