import HostDetailLayout from '../../../shared/ui/backgrounds/HostDetailLayout';
import ProfileCircle from '../../../../design-system/ui/Profile';
import { useParams } from 'react-router-dom';

const HostInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const userData = [
    { id: 1, name: '유진', fullName: '백유진' },
    { id: 1, name: '예진', fullName: '고예진' },
    { id: 2, name: '유진', fullName: '백유진' },
    { id: 2, name: '예진', fullName: '고예진' },
    { id: 1, name: '히은', fullName: '조히은' },
    { id: 3, name: '유진', fullName: '백유진' },
    { id: 3, name: '정준', fullName: '민정준' },
    { id: 1, name: '히은', fullName: '조히은' },
  ];
  const user = userData.filter(user => user.id === Number(id));

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
                  name={user.name}
                  className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 text-sm md:text-16 lg:text-base"
                >
                  {user.fullName}
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
