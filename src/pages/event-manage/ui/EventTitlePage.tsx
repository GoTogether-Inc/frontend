import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';
import { EventTitleFormData, eventTitleZodValidation } from '../../../shared/lib/formValidation';

interface EventTitlePageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const EventTitlePage = ({ onValidationChange }: EventTitlePageProps) => {
  const { formState, setFormState } = useFunnelState();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<EventTitleFormData>({
    mode: 'onChange',
    defaultValues: {
      title: formState.title || '',
    },
    ...eventTitleZodValidation,
  });

  const titleValue = watch('title');

  onValidationChange?.(isValid);

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      title: titleValue,
    }));
  }, [titleValue, setFormState]);

  return (
    <div className="flex justify-start items-center w-full p-5">
      <UnderlineTextField
        label="이벤트 제목"
        className="w-full"
        errorMessage={errors.title?.message}
        {...register('title')}
      />
    </div>
  );
};

export default EventTitlePage;
