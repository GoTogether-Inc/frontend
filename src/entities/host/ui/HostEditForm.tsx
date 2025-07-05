import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHostChannelInfo from '../hook/useHostChannelInfoHook';
import { useHostInfoSave } from '../../../features/host/hook/useHostInfoHook';
import { hostInfoSchema } from '../../../shared/lib/formValidation';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';

const HostEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const hostChannelId = Number(id);

  const [email, setEmail] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  const { data: hostInfo } = useHostChannelInfo(hostChannelId);
  const { handleSave } = useHostInfoSave(hostChannelId, hostInfo!, email, channelDescription);

  const emailValidation = hostInfoSchema.safeParse({ email });

  useEffect(() => {
    if (hostInfo?.result.email) setEmail(hostInfo.result.email);
    if (hostInfo?.result.channelDescription) setChannelDescription(hostInfo.result.channelDescription);
  }, [hostInfo]);

  return (
    <div className="flex flex-col gap-4 md:gap-8 px-8 md:px-6 mb-4 md:mb-8">
      <div className="flex flex-col gap-2">
        <DefaultTextField
          label="대표 이메일"
          detail="채널 혹은, 채널에서 주최하는 이벤트에 대해 문의 할 수 있는 메일로 작성해주세요."
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="h-12"
          labelClassName="sm:text-base md:text-lg"
          errorMessage={!emailValidation.success ? emailValidation.error.errors[0].message : ''}
        />
        <TertiaryButton
          type="button"
          label="수정하기"
          size="large"
          color="pink"
          onClick={handleSave}
          disabled={!emailValidation.success}
        />
      </div>
      <div className="flex flex-col gap-2">
        <MultilineTextField
          label="채널에 대한 설명"
          value={channelDescription}
          onChange={e => setChannelDescription(e.target.value)}
          className="h-24 mb-8"
        />
        <TertiaryButton type="button" label="수정하기" size="large" color="pink" onClick={handleSave} />
      </div>
    </div>
  );
};

export default HostEditForm;
