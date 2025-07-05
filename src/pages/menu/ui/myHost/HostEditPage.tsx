import { useState } from 'react';
import HostDetailLayout from '../../../../shared/ui/backgrounds/HostDetailLayout';
import { useParams } from 'react-router-dom';
import useHostChannelInfo from '../../../../entities/host/hook/useHostChannelInfoHook';
import { useInviteMembers } from '../../../../features/host/hook/useInviteHostHook';
import HostInfo from '../../../../entities/host/ui/HostInfo';
import HostEditForm from '../../../../entities/host/ui/HostEditForm';
import MemberInvite from '../../../../entities/host/ui/MemberInvite';

const HostEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedHost, setSelectedHost] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const hostChannelId = Number(id);
  const { data: hostInfo } = useHostChannelInfo(hostChannelId);
  const { inviteMembers } = useInviteMembers(hostChannelId);

  const handeHostInfoClick = () => {
    setSelectedHost(true);
    setSelectedInfo(false);
  };
  const handeInfoEditClick = () => {
    setSelectedInfo(true);
    setSelectedHost(false);
  };

  const handleInviteMembers = () => {
    if (!hostInfo?.result.id) return;
    inviteMembers(emails, () => setEmails([]));
  };

  return (
    <HostDetailLayout>
      <div className="relative overflow-y-auto">
        <div className="flex flex-col w-full px-8 py-8 gap-3">
          <div className="flex justify-between px-12 md:px-20 text-16 md:text-base">
            <span
              onClick={handeHostInfoClick}
              className={`cursor-pointer ${selectedHost ? 'text-black' : 'text-placeholderText'} transition-colors`}
            >
              호스트 정보
            </span>
            <span
              onClick={handeInfoEditClick}
              className={`cursor-pointer ${selectedInfo ? 'text-black' : 'text-placeholderText'} transition-colors`}
            >
              정보 수정
            </span>
          </div>
          <div className="relative">
            {selectedHost && <div className="absolute top-0 left-8 md:left-15 w-28 border-t-2 border-black" />}
            {selectedInfo && <div className="absolute top-0 right-7 md:right-15 w-24 border-t-2 border-black" />}
            <hr className="border-t-2" />
          </div>
        </div>

        {selectedHost && <HostInfo hostInfo={hostInfo} />}

        {selectedInfo && (
          <>
            <HostEditForm />
            <MemberInvite emails={emails} setEmails={setEmails} handleInviteMembers={handleInviteMembers} />
          </>
        )}
      </div>
    </HostDetailLayout>
  );
};
export default HostEditPage;
