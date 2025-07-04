import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventList from '../../../features/event/ui/EventList';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../app/provider/authStore';
import { AnimatePresence } from 'framer-motion';
import LoginModal from '../../../widgets/main/ui/LoginModal';
import ProfileCircle from '../../../../design-system/ui/Profile';
import { formatProfilName } from '../../../shared/lib/formatProfileName';

const AllEventsPage = () => {
  const navigater = useNavigate();
  const { isModalOpen, openModal, closeModal, isLoggedIn, name } = useAuthStore();

  return (
    <div className="flex flex-col items-center mb-28">
      <Header
        centerContent={
          <SearchTextField
            iconPath={<img src={searchIcon} alt="searchIcon" />}
            onClick={() => navigater('/search')}
            onChange={() => {}}
            placeholder="검색어를 입력해주세요"
          />
        }
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => navigater('/')}
        leftButtonLabel="같이가요"
        rightContent={
          isLoggedIn ? (
            <ProfileCircle profile="userProfile" name={formatProfilName(name || '')} className="w-11 h-11 text-15" />
          ) : (
            <SecondaryButton size="large" color="black" label="로그인" onClick={openModal} />
          )
        }
      />
      <AnimatePresence>{isModalOpen && <LoginModal onClose={closeModal} />}</AnimatePresence>
      {/* 이벤트 카드 목록 */}
      <EventList tag="current" />
      <BottomBar />
    </div>
  );
};
export default AllEventsPage;
