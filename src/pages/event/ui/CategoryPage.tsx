import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventList from '../../../features/event/ui/EventList';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../../app/provider/authStore';
import { AnimatePresence } from 'framer-motion';
import LoginModal from '../../../widgets/main/ui/LoginModal';

const CategoryPage = () => {
  const navigater = useNavigate();
  const location = useLocation();
  const category = location.state?.category;
  const { isModalOpen, openModal, closeModal, isLoggedIn, name } = useAuthStore();

  return (
    <div className="flex flex-col items-center mb-28">
      <Header
        centerContent={
          <SearchTextField
            iconPath={<img src={searchIcon} alt="searchIcon" />}
            onClick={() => navigater('/search')}
            onChange={() => {}}
            placeholder="입력해주세요"
          />
        }
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => navigater('/')}
        leftButtonLabel="같이가요"
        rightContent={
          <SecondaryButton
            size="large"
            color="black"
            label={isLoggedIn ? `${name}님` : '로그인'}
            onClick={isLoggedIn ? closeModal : openModal}
          />
        }
      />
      <AnimatePresence>{isModalOpen && <LoginModal onClose={closeModal} />}</AnimatePresence>
      {/* 이벤트 카드 목록 */}
      <EventList category={category} />
      <BottomBar />
    </div>
  );
};

export default CategoryPage;
