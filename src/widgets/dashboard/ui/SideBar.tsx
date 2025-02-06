import { useState } from 'react';
import Header from '../../../../design-system/ui/Header';
import menuBar from '../../../../public/assets/dashboard/menu/MenuBar.svg';
import { menuLists } from '../../../shared/types/dashboardType';
import { useLocation, useNavigate } from 'react-router-dom';
import HorizontalCardButton from '../../../../design-system/ui/buttons/HorizontalCardButton';

const SideBar = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  const handleMenuClick = (menuText: string, path: string) => {
    if (location.pathname === path) {
      onClose();
    } else {
      setSelectedIcon(menuText);
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-lg fixed inset-0 z-40 bg-white border-[0.5px] border-black py-3">
      <Header
        centerContent="대시보드"
        rightContent={<img src={menuBar} onClick={onClose} className="cursor-pointer z-80 relative" />}
      />
      <div className="flex flex-col gap-7 md:gap-8 mt-4">
        {menuLists.map((menu, index) => (
          <div
            key={index}
            className="flex items-center space-x-6 cursor-pointer group"
            onClick={() => handleMenuClick(menu.text, menu.path)}
          >
            <div
              className={`w-1 h-8 rounded-[5px] transition-all${
                selectedIcon === menu.text ? 'bg-main' : 'bg-transparent group-hover:bg-main'
              }`}
            />
            <HorizontalCardButton
              iconPath={
                <img
                  src={selectedIcon === menu.text ? menu.clickedIcon : menu.icon}
                  alt={menu.text}
                  className="w-8 h-8 md:w-9 md:h-9 mr-3"
                />
              }
              hoverIconPath={<img src={menu.clickedIcon} alt={menu.text} className="w-8 h-8 md:w-9 md:h-9 mr-3" />}
              label={menu.text}
              onClick={() => handleMenuClick(menu.text, menu.path)}
              className="group"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SideBar;
