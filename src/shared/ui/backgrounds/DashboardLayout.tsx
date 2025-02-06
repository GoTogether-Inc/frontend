import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import dashboardMenu from '../../../../public/assets/dashboard/DashboardMenu.svg';
import { useState } from 'react';
import SideBar from '../../../widgets/dashboard/ui/SideBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  centerContent: string;
}

const DashboardLayout = ({ children, centerContent }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative flex">
      {/* 헤더 영역 */}
      <div className="absolute top-0 w-full h-44 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] py-3">
        <Header
          leftButtonLabel="<"
          leftButtonClassName="text-2xl z-30 font-semibold"
          leftButtonClick={handleBackClick}
          centerContent={centerContent}
          color="white"
          rightContent={
            <img src={dashboardMenu} alt="메뉴바" onClick={handleModalOpen} className="cursor-pointer z-30" />
          }
        />
      </div>

      {/* 레이아웃 내용 */}
      <div className="flex flex-col justify-between w-full min-h-[calc(100vh-6rem)] bg-white rounded-[20px] mt-20 z-20">
        {children}
      </div>
      {modalOpen && <SideBar onClose={handleModalClose} />}
    </div>
  );
};
export default DashboardLayout;
