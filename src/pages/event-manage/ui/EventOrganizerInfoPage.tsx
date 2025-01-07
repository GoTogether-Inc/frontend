import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validations } from '../../../shared/lib/validation';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { useFunnelState } from '../../../features/event-manage/model/FunnelContext';

interface FormInputs {
  email: string;
  phone: string;
}

const EventOrganizerInfoPage = () => {
  const { formState, setFormState } = useFunnelState();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: {
      email: formState.organizerEmail || '',
      phone: formState.organizerPhoneNumber || '',
    },
  });

  const phoneValue = watch('phone');
  const emailValue = watch('email');

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      organizerEmail: emailValue,
      organizerPhoneNumber: phoneValue,
    }));
  }, [emailValue, phoneValue, setFormState]);

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
export default EventOrganizerInfoPage;
