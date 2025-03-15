import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';
import { OrganizerFormData, organizerZodValidation } from '../../../shared/lib/formValidation';

interface EventOrganizerInfoPageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const EventOrganizerInfoPage = ({ onValidationChange }: EventOrganizerInfoPageProps) => {
  const { eventState, setEventState } = useFunnelState();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<OrganizerFormData>({
    mode: 'onChange',
    defaultValues: {
      email: eventState.organizerEmail || '',
      phone: eventState.organizerPhoneNumber || '',
    },
    ...organizerZodValidation,
  });

  const phoneValue = watch('phone');
  const emailValue = watch('email');

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    setEventState(prev => ({
      ...prev,
      organizerEmail: emailValue,
      organizerPhoneNumber: phoneValue,
    }));
  }, [emailValue, phoneValue, setEventState]);

  return (
    <div className="flex flex-col gap-6 md:gap-7 p-5">
      <UnderlineTextField
        label="이메일"
        placeholder="이메일"
        type="email"
        errorMessage={errors.email?.message}
        className="w-full"
        {...register('email')}
      />
      <UnderlineTextField
        label="전화번호"
        placeholder={`"-" 없이 번호만 입력해주세요`}
        type="tel"
        errorMessage={errors.phone?.message}
        className="w-full"
        {...register('phone')}
      />
    </div>
  );
};
export default EventOrganizerInfoPage;
