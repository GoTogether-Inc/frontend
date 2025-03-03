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
import EventCard from '../../../shared/ui/EventCard';
import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { closingSoonEvents, latestEvents, trendingEvents } from '../../../shared/types/eventCardType';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import rightButton from '../../../../public/assets/main/RightButton.svg';
import leftButton from '../../../../public/assets/main/LeftButton.svg';
import { AnimatePresence } from 'framer-motion';
import LoginModal from '../../../widgets/main/ui/LoginModal';
import { cardButtons } from '../../../shared/types/mainCardButtonType';

const MainPage = () => {
  const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [latestStartIndex, setLatestStartIndex] = useState<number>(0);
  const [trendingStartIndex, setTrendingStartIndex] = useState<number>(0);
  const [closingStartIndex, setClosingStartIndex] = useState<number>(0);
  const maxCardsToShow = 2;
  const navigate = useNavigate();

  type SetStartIndex = Dispatch<SetStateAction<number>>;

  const handleNext = (setStartIndex: SetStartIndex, currentIndex: number, eventsLength: number): void => {
    setStartIndex((currentIndex + 1) % eventsLength);
  };

  const handlePrev = (setStartIndex: SetStartIndex, currentIndex: number, eventsLength: number): void => {
    setStartIndex((currentIndex - 1 + eventsLength) % eventsLength);
  };

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
        rightContent={<SecondaryButton size="large" color="black" label="로그인" onClick={() => setModalOpen(true)} />}
      />
      <AnimatePresence>{modalOpen && <LoginModal onClose={() => setModalOpen(false)} />}</AnimatePresence>

      <div className="w-full px-6">
        <Banner images={images} interval={5000} />
        {/* VerticalCardButtons Section */}
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
      {/* 최신 이벤트 섹션 */}
      <div className="relative w-full px-6">
        <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">최신 이벤트</h2>
        <div className="flex gap-4">
          {latestEvents
            .slice(latestStartIndex, latestStartIndex + maxCardsToShow)
            .concat(
              latestStartIndex + maxCardsToShow > latestEvents.length
                ? latestEvents.slice(0, (latestStartIndex + maxCardsToShow) % latestEvents.length)
                : []
            )
            .map((event, index) => (
              <EventCard
                key={index}
                img={event.img}
                eventTitle={event.eventTitle}
                dDay={event.dDay}
                host={event.host}
                eventDate={event.eventDate}
                location={event.location}
                hashtags={event.hashtags}
                onClick={() => navigate('/event-details')}
              />
            ))}
        </div>
        {latestStartIndex !== 0 && (
          <IconButton
            iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
            onClick={() => handlePrev(setLatestStartIndex, latestStartIndex, latestEvents.length)}
          />
        )}
        <IconButton
          iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
          onClick={() => handleNext(setLatestStartIndex, latestStartIndex, latestEvents.length)}
        />
      </div>
      {/* 요즘 뜨는 이벤트 섹션 */}
      <div className="relative w-full px-6">
        <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">요즘 뜨는 이벤트</h2>
        <div className="flex gap-4">
          {trendingEvents
            .slice(trendingStartIndex, trendingStartIndex + maxCardsToShow)
            .concat(
              trendingStartIndex + maxCardsToShow > trendingEvents.length
                ? trendingEvents.slice(0, (trendingStartIndex + maxCardsToShow) % trendingEvents.length)
                : []
            )
            .map((event, index) => (
              <EventCard
                key={index}
                img={event.img}
                eventTitle={event.eventTitle}
                dDay={event.dDay}
                host={event.host}
                eventDate={event.eventDate}
                location={event.location}
                hashtags={event.hashtags}
              />
            ))}
        </div>
        {trendingStartIndex !== 0 && (
          <IconButton
            iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
            onClick={() => handlePrev(setTrendingStartIndex, trendingStartIndex, trendingEvents.length)}
          />
        )}
        <IconButton
          iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
          onClick={() => handleNext(setTrendingStartIndex, trendingStartIndex, trendingEvents.length)}
        />
      </div>

      {/* 곧 마감되는 이벤트 섹션 */}
      <div className="relative w-full px-6">
        <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">
          곧 이벤트가 마감돼요! ⏰
        </h2>
        <div className="flex gap-4">
          {closingSoonEvents
            .slice(closingStartIndex, closingStartIndex + maxCardsToShow)
            .concat(
              closingStartIndex + maxCardsToShow > closingSoonEvents.length
                ? closingSoonEvents.slice(0, (closingStartIndex + maxCardsToShow) % closingSoonEvents.length)
                : []
            )
            .map((event, index) => (
              <EventCard
                key={index}
                img={event.img}
                eventTitle={event.eventTitle}
                dDay={event.dDay}
                host={event.host}
                eventDate={event.eventDate}
                location={event.location}
                hashtags={event.hashtags}
              />
            ))}
        </div>
        {closingStartIndex !== 0 && (
          <IconButton
            iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
            onClick={() => handlePrev(setClosingStartIndex, closingStartIndex, closingSoonEvents.length)}
          />
        )}
        <IconButton
          iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
          onClick={() => handleNext(setClosingStartIndex, closingStartIndex, closingSoonEvents.length)}
        />
      </div>
      <button
        onClick={() => navigate('/all-events')}
        className="flex items-center justify-center text-white bg-black lg:px-7 lg:py-3 md:px-6 md:py-3 sm:px-5 sm:py-2.5 rounded-3xl sm:text-xs md:text-sm lg:text-base"
      >
        전체 이벤트 보러가기 <span className="ml-1.5">&gt;</span>
      </button>
      <BottomBar />
    </div>
  );
};
export default MainPage;
