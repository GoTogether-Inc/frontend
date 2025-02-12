import { flexColumn } from '../../../../design-system/styles/flex';
import HorizontalCardButton from '../../../../design-system/ui/buttons/HorizontalCardButton';
import { useNavigate } from 'react-router-dom';

import searchIcon from '../../../../design-system/icons/Search.svg';
import Header from '../../../../design-system/ui/Header';
import { buttonData } from '../../../shared/types/menuType';

const handleIconClick = (navigate: (path: string) => void, path: string) => {
  navigate(path);
};

const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        centerContent="카테고리"
        rightContent={
          <button type="button" className="w-5">
            <img src={searchIcon} alt="Search Icon" />
          </button>
        }
      />
      <div className={`${flexColumn} gap-4 px-8 md:px-10 mt-8`}>
        {buttonData.map((button, index) => (
          <div key={button.label}>
            <HorizontalCardButton
              iconPath={<img src={button.iconPath} alt={button.label} className="w-6 h-6 md:w-7 md:h-7" />}
              hoverIconPath={<img src={button.hoverIconPath} alt={button.label} className="w-6 h-6 md:w-7 md:h-7" />}
              label={button.label}
              onClick={() => handleIconClick(navigate, button.path)}
            />
            {button.label !== '내 호스트' && index !== buttonData.length - 1 && (
              <hr className="mt-5 border-[0.5px] border-gray4" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default MenuPage;
