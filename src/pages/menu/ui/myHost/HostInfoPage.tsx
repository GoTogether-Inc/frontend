import HostDetailLayout from '../../../../shared/ui/backgrounds/HostDetailLayout';
import ProfileCircle from '../../../../../design-system/ui/Profile';
import { useParams } from 'react-router-dom';
import { hostInfo } from '../../../../shared/types/hostInfoType';

const HostInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const user = hostInfo.filter(user => user.id === Number(id));

  return (
    <HostDetailLayout>
      <div className="relative overflow-y-auto">
        <div className="flex flex-col px-8 md:px-12 gap-6">
          <div className="flex flex-col gap-4 py-8">
            <p className="text-xl text-black font-semibold">대표 이메일</p>
            <p>example@example.com</p>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <p className="text-xl text-black font-semibold">멤버 목록</p>
            <div className="flex flex-wrap gap-x-5 gap-y-4 lg:gap-x-10 lg:gap-y-6 text-sm md:text-16 lg:text-base">
              {user.map(user => (
                <ProfileCircle
                  key={user.id}
                  id={user.id}
                  profile="userProfile"
                  name={user.nickname}
                  className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 text-sm md:text-16 lg:text-base"
                >
                  {user.name}
                </ProfileCircle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HostDetailLayout>
  );
};
export default HostInfoPage;
