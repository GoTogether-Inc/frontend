import { useParams } from 'react-router-dom';
import ProfileCircle from '../../../../design-system/ui/Profile';
import Header from '../../../../design-system/ui/Header';
import { ButtonHTMLAttributes, ReactElement } from 'react';
import { hostInfo, hostInfoData } from '../../types/hostInfoType';

interface HostDetailLayoutProps {
  rightContent?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  children: React.ReactNode;
}
const HostDetailLayout = ({ rightContent, children }: HostDetailLayoutProps) => {
  const { id } = useParams<{ id: string }>();

  const host: hostInfoData | undefined = hostInfo.find(host => host.id === Number(id));

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="bg-white relative">
      <div className="top-0 h-48 md:h-56 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)]">
        {/* 헤더 영역 */}
        <Header
          leftButtonLabel="<"
          leftButtonClassName="text-xl z-30"
          leftButtonClick={handleBackClick}
          rightContent={rightContent}
          color="white"
        />
        <div className="flex justify-center items-center px-6 md:px-10">
          <ProfileCircle profile="HostProfile" className="md:w-28 md:h-28 w-24 h-24" />

          <div className="flex flex-col gap-1 md:gap-3 ml-5 text-white">
            <p className="text-lg md:text-xl font-bold">{host?.name}</p>
            <p className="flex-wrap text-sm md:text-base">{host?.description}</p>
          </div>
        </div>
      </div>
      {/* 레이아웃 내용 */}
      <div className="absolute top-[calc(100%-2vh)] w-full bg-white rounded-t-[20px]">{children}</div>
    </div>
  );
};
export default HostDetailLayout;
