import ProfileCircle from '../../../../design-system/ui/Profile';
import { formatProfilName } from '../../../shared/lib/formatProfileName';
import { HostChannelInfoResponse } from '../model/hostChannelInfo';

const HostInfo = ({ hostInfo }: { hostInfo?: HostChannelInfoResponse }) => {
  return (
    <div className="flex flex-col px-8 md:px-12 gap-6">
      <div className="flex flex-col gap-4 py-4">
        <p className="text-xl text-black font-semibold">대표 이메일</p>
        <p>{hostInfo?.result.email}</p>
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">
        <p className="text-xl text-black font-semibold">멤버 목록</p>
        <div className="flex flex-wrap gap-x-5 gap-y-4 lg:gap-x-10 lg:gap-y-6 text-sm md:text-16 lg:text-base">
          {hostInfo?.result.hostChannelMembers.map(user => (
            <ProfileCircle
              key={user.id}
              id={user.id}
              profile="userProfile"
              name={formatProfilName(user.memberName)}
              className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14"
            >
              {user.memberName}
            </ProfileCircle>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
