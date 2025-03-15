import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';
import { EventTitleFormData, eventTitleZodValidation } from '../../../shared/lib/formValidation';

interface EventTitlePageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const EventTitlePage = ({ onValidationChange }: EventTitlePageProps) => {
  const { eventState, setEventState } = useFunnelState();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<EventTitleFormData>({
    mode: 'onChange',
    defaultValues: {
      title: eventState.title || '',
    },
    ...eventTitleZodValidation,
  });

  const titleValue = watch('title');

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    setEventState(prev => ({
      ...prev,
      title: titleValue,
    }));
  }, [titleValue, setEventState]);

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
