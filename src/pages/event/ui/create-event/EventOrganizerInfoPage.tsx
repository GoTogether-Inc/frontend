import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UnderlineTextField from '../../../../../design-system/ui/textFields/UnderlineTextField';
import { useFunnelState } from '../../../../features/event/model/FunnelContext';
import { OrganizerFormData, organizerZodValidation } from '../../../../shared/lib/formValidation';
import { formatPhoneNumber } from '../../../../shared/utils/phoneFormatter';

interface EventOrganizerInfoPageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const EventOrganizerInfoPage = ({ onValidationChange }: EventOrganizerInfoPageProps) => {
  const { eventState, setEventState } = useFunnelState();

  const {
    register,
    setValue,    
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

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
        label="연락처"
        placeholder="010-1234-5678"
        type="tel"
        errorMessage={errors.phone?.message}
        className="w-full"
        value={phoneValue}
        onChange={handlePhoneChange}
      />
    </div>
  );
};
export default EventOrganizerInfoPage;
