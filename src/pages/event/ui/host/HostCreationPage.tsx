import basicProfile from '../../../../../public/assets/event-manage/creation/BasicProfile.png';
import addImage from '../../../../../public/assets/event-manage/creation/AddImage.svg';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../../design-system/ui/textFields/MultilineTextField';
import { useEffect } from 'react';
import { useFunnelState } from '../../../../features/event/model/FunnelContext';
import { useForm } from 'react-hook-form';
import { hostCreationZodValidation } from '../../../../shared/lib/formValidation';
import { HostCreationFormData } from '../../../../shared/lib/formValidation';
import useImageUpload from '../../../../shared/hooks/useImageUpload';

interface HostCreationPageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const HostCreationPage = ({ onValidationChange }: HostCreationPageProps) => {
  const { hostState, setHostState } = useFunnelState();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<HostCreationFormData>({
    mode: 'onChange',
    defaultValues: {
      hostChannelName: hostState.hostChannelName || '',
      hostEmail: hostState.hostEmail || '',
      channelDescription: hostState.channelDescription || '',
    },
    ...hostCreationZodValidation,
  });

  const hostChannelName = watch('hostChannelName');
  const hostEmail = watch('hostEmail');
  const channelDescription = watch('channelDescription');

  const { previewUrl, fileInputRef, handleFileChange } = useImageUpload({
    value: hostState.profileImageUrl,
    onSuccess: url => {
      setHostState(prev => ({
        ...prev,
        profileImageUrl: url,
      }));
    },
  });

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    setHostState(prev => ({
      ...prev,
      hostChannelName: hostChannelName,
      hostEmail: hostEmail,
      channelDescription: channelDescription,
    }));
  }, [hostChannelName, hostEmail, channelDescription, setHostState]);

  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="relative flex items-center justify-center mb-4">
        <img
          src={previewUrl || basicProfile}
          alt="기본 프로필 이미지"
          className="w-24 h-24 object-cover rounded-full"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 sm:right-[33%] md:right-[35%] lg:right-[38%]"
        >
          <img src={addImage} alt="이미지 추가 버튼" className="w-7" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
      </div>
      <DefaultTextField
        label="채널 이름을 입력해주세요"
        placeholder="채널 이름을 입력해 주세요"
        className="h-12"
        labelClassName="sm:text-base md:text-lg"
        errorMessage={errors.hostChannelName?.message}
        {...register('hostChannelName')}
      />
      <DefaultTextField
        label="대표 이메일"
        detail="주최하는 이벤트에 대해 문의 할 수 있는 메일로 작성해주세요"
        placeholder="example@example.com"
        className="h-12"
        labelClassName="sm:text-base md:text-lg"
        errorMessage={errors.hostEmail?.message}
        {...register('hostEmail')}
      />
      <MultilineTextField
        label="채널에 대한 설명"
        placeholder="채널에 대한 설명을 적어주세요"
        className="h-20"
        errorMessage={errors.channelDescription?.message}
        {...register('channelDescription')}
      />
    </div>
  );
};

export default HostCreationPage;
