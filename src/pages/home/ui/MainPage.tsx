import Header from '../../../../design-system/ui/Header';
import Banner from '../../../widgets/main/ui/Banner';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import VerticalCardButton from '../../../../design-system/ui/buttons/VerticalCardButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginModal from '../../../widgets/main/ui/LoginModal';
import { cardButtons } from '../../../shared/types/mainCardButtonType';
import useAuthStore from '../../../app/provider/authStore';
import EventTags from '../../../features/home/ui/EventTags';
import ProfileCircle from '../../../../design-system/ui/Profile';
import useEventList from '../../../entities/event/hook/useEventListHook';
import FloatingButton from '../../../shared/ui/FloatingButton';
import manualIcon from '../../../../public/assets/menu/help.svg';
import { USER_MANUAL_URL } from '../../../shared/types/menuType';
import { formatProfilName } from '../../../shared/lib/formatProfileName';
const MainPage = () => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal, isLoggedIn, name } = useAuthStore();
  const { data } = useEventList();

  const recentEvents = data?.pages[0].items.slice(0, 4) ?? [];

  const bannerImages = recentEvents.map(event => ({
    img: event.bannerImageUrl,
    link: `/event-details/${event.id}`,
  }));

  const handleRefresh = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      openModal();
    }
  }, [isLoggedIn, openModal]);

  return (
    <div className="relative flex flex-col items-center pb-24">
      <Header
        centerContent={
          <SearchTextField
            iconPath={<img src={searchIcon} alt="Search" />}
            onClick={() => navigate('/search')}
            onChange={() => {}}
            placeholder="검색어를 입력해주세요"
          />
        }
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={handleRefresh}
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

      <div className="w-full px-6">
        {bannerImages.length > 0 && <Banner images={bannerImages} interval={5000} />}
        <div className="flex items-center justify-around sm:my-8 md:my-9 lg:my-10">
          {cardButtons.map((button, index) => (
            <VerticalCardButton
              key={index}
              iconPath={<img src={button.iconPath} alt="메인 아이콘" />}
              label={button.label}
              size="lg"
              onClick={() => navigate('/category', { state: { category: button.category } })}
              className="font-semibold"
            />
          ))}
        </div>
      </div>

      {/* 이벤트 태그 섹션 (최신, 인기, 마감임박) */}
      <EventTags />

      {/* 전체 이벤트 보러가기 버튼 */}
      <button
        onClick={() => navigate('/all-events')}
        className="flex items-center justify-center text-white bg-black lg:px-7 lg:py-3 md:px-6 md:py-3 sm:px-5 sm:py-2.5 rounded-3xl sm:text-xs md:text-sm lg:text-base"
      >
        전체 이벤트 보러가기 <span className="ml-1.5">&gt;</span>
      </button>
      <div className="sticky w-full flex justify-end px-6 z-50">
        <FloatingButton ariaLabel="사용법" onClick={() => window.open(USER_MANUAL_URL, '_blank')} className="bottom-24">
          <img src={manualIcon} alt="사용법" className="w-full h-full" />
        </FloatingButton>
      </div>
      <BottomBar />
    </div>
  );
};

export default MainPage;
