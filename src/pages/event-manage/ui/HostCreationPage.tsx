import basicProfile from '../../../../public/assets/event-manage/creation/BasicProfile.svg';
import addImage from '../../../../public/assets/event-manage/creation/AddImage.svg';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';
import React from 'react';
import { FunnelState, useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';

const HostCreationPage = () => {
  const { formState, setFormState } = useFunnelState();
  const handleChange =
    (field: keyof FunnelState['formState']) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState(prev => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="relative flex items-center justify-center mb-4">
        <img src={basicProfile} alt="기본 프로필 이미지" className="w-24 object-cover" />
        <button className="absolute bottom-0 sm:right-[33%] md:right-[35%] lg:right-[38%]">
          <img src={addImage} alt="이미지 추가 버튼" className="w-7" />
        </button>
      </div>
      <DefaultTextField
        label="채널 이름을 입력해주세요"
        placeholder="채널 이름을 입력해 주세요"
        value={formState.hostChannelName}
        onChange={handleChange('hostChannelName')}
        className="h-12"
        labelClassName="sm:text-base md:text-lg"
      />
      <DefaultTextField
        label="대표 이메일"
        detail="주최하는 이벤트에 대해 문의 할 수 있는 메일로 작성해주세요"
        placeholder="example@example.com"
        value={formState.hostEmail}
        onChange={handleChange('hostEmail')}
        className="h-12"
        labelClassName="sm:text-base md:text-lg"
      />
      <MultilineTextField
        label="채널에 대한 설명"
        placeholder="채널에 대한 설명을 적어주세요"
        value={formState.channelDescription}
        onChange={handleChange('channelDescription')}
        className="h-20"
      />
    </div>
  );
};
export default HostCreationPage;
