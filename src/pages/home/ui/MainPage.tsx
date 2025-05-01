import Header from '../../../../design-system/ui/Header';
import Banner from '../../../widgets/main/ui/Banner';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import VerticalCardButton from '../../../../design-system/ui/buttons/VerticalCardButton';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginModal from '../../../widgets/main/ui/LoginModal';
import { cardButtons } from '../../../shared/types/mainCardButtonType';
import useAuthStore from '../../../app/provider/authStore';
import EventTag from '../../../features/home/ui/EventTags';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const MainPage = () => {
  const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ];
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal, isLoggedIn, name } = useAuthStore();

  return (
    <div className="flex flex-col items-center pb-24">
      <Header
        centerContent={
          <SearchTextField
            iconPath={<img src={searchIcon} alt="Search" />}
            onClick={() => navigate('/search')}
            onChange={() => {}}
            placeholder="입력해주세요"
          />
        }
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => {}}
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

      <div className="w-full px-6">
        <Banner images={images} interval={5000} />
        <div className="flex items-center justify-around sm:my-8 md:my-9 lg:my-10">
          {cardButtons.map((button, index) => (
            <VerticalCardButton
              key={index}
              iconPath={<img src={button.iconPath} alt="메인 아이콘" />}
              label={button.label}
              size="lg"
              onClick={button.onClick}
              className="font-semibold"
            />
          ))}
        </div>
      </div>

      {/* 이벤트 태그 섹션 (최신, 인기, 마감임박) */}
      <EventTag />

      {/* 전체 이벤트 보러가기 버튼 */}
      <button
        onClick={() => navigate('/all-events')}
        className="flex items-center justify-center text-white bg-black lg:px-7 lg:py-3 md:px-6 md:py-3 sm:px-5 sm:py-2.5 rounded-3xl sm:text-xs md:text-sm lg:text-base"
      >
        전체 이벤트 보러가기 <span className="ml-1.5">&gt;</span>
      </button>
      <BottomBar />
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </div>
  );
};

export default MainPage;
