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

const MainPage = () => {
  const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ];

  // 버튼 데이터
  const cardButtons = [
    {
      iconPath: '/assets/main-buttons/DevStudy.svg',
      label: '개발/스터디',
      onClick: () => console.log('DevStudy clicked'),
    },
    {
      iconPath: '/assets/main-buttons/Networking.svg',
      label: '네트워킹',
      onClick: () => console.log('Networking clicked'),
    },
    {
      iconPath: '/assets/main-buttons/Hackathon.svg',
      label: '해커톤',
      onClick: () => console.log('Hackathon clicked'),
    },
    {
      iconPath: '/assets/main-buttons/Conference.svg',
      label: '컨퍼런스',
      onClick: () => console.log('Conference clicked'),
    },
  ];

  // 이벤트 리스트 분리
  const latestEvents = [
    {
      img: firstPage,
      eventTitle: '1인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      img: secondPage,
      eventTitle: '2인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      img: thirdPage,
      eventTitle: '3인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
  ];

  const trendingEvents = [
    {
      img: firstPage,
      eventTitle: '1해커톤 2024 - Global Hackathon',
      dDay: 'D-5',
      host: '해커톤 조직 위원회',
      eventDate: '2025년 1월 18일',
      location: '서울 코엑스',
      hashtags: ['#Hackathon', '#창의력', '#개발', '#팀워크'],
    },
    {
      img: secondPage,
      eventTitle: '2해커톤 2024 - Global Hackathon',
      dDay: 'D-5',
      host: '해커톤 조직 위원회',
      eventDate: '2025년 1월 18일',
      location: '서울 코엑스',
      hashtags: ['#Hackathon', '#창의력', '#개발', '#팀워크'],
    },
    {
      img: thirdPage,
      eventTitle: '3해커톤 2024 - Global Hackathon',
      dDay: 'D-5',
      host: '해커톤 조직 위원회',
      eventDate: '2025년 1월 18일',
      location: '서울 코엑스',
      hashtags: ['#Hackathon', '#창의력', '#개발', '#팀워크'],
    },
  ];

  const closingSoonEvents = [
    {
      img: firstPage,
      eventTitle: '1커뮤니티 네트워킹 - Dev MeetUp 2024',
      dDay: 'D-6',
      host: 'Dev 커뮤니티',
      eventDate: '2025년 1월 12일',
      location: '판교 스타트업 캠퍼스',
      hashtags: ['#네트워킹', '#개발자', '#스타트업', '#기술교류'],
    },
    {
      img: secondPage,
      eventTitle: '2커뮤니티 네트워킹 - Dev MeetUp 2024',
      dDay: 'D-6',
      host: 'Dev 커뮤니티',
      eventDate: '2025년 1월 12일',
      location: '판교 스타트업 캠퍼스',
      hashtags: ['#네트워킹', '#개발자', '#스타트업', '#기술교류'],
    },
    {
      img: thirdPage,
      eventTitle: '3커뮤니티 네트워킹 - Dev MeetUp 2024',
      dDay: 'D-6',
      host: 'Dev 커뮤니티',
      eventDate: '2025년 1월 12일',
      location: '판교 스타트업 캠퍼스',
      hashtags: ['#네트워킹', '#개발자', '#스타트업', '#기술교류'],
    },
  ];

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
  const handleEventCardClick = () => {
    navigate('/event-details');
  };
  const handleAllEventsButtonClick = () => {
    navigate('/all-events');
  };

  const handleSearchButtonClick = () => {
    navigate('/search');
  };

  return (
    <div className="flex flex-col items-center pb-24">
      <Header
        centerContent={
          <SearchTextField
            iconPath={<img src={searchIcon} alt="Search" />}
            onClick={handleSearchButtonClick}
            onChange={() => {}}
            placeholder="입력해주세요"
          />
        }
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => {}}
        leftButtonLabel="같이가요"
        rightContent={<SecondaryButton size="large" color="black" label="로그인" onClick={() => {}} />}
      />
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
      <div className="relative w-full px-6 mb-8">
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
                onClick={handleEventCardClick}
              />
            ))}
        </div>
        {latestStartIndex !== 0 && (
          <button
            onClick={() => handlePrev(setLatestStartIndex, latestStartIndex, latestEvents.length)}
            className="absolute text-gray-500 rounded-full shadow-md sm:text-xs md:text-sm lg:text-md sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 sm:left-3 md:left-2.5 lg:left-2 bg-gray-50 top-1/2"
          >
            &lt;
          </button>
        )}
        <button
          onClick={() => handleNext(setLatestStartIndex, latestStartIndex, latestEvents.length)}
          className="absolute text-gray-500 rounded-full shadow-md sm:text-xs md:text-sm lg:text-md sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 sm:right-3 md:right-2.5 lg:right-2 bg-gray-50 top-1/2 "
        >
          &gt;
        </button>
      </div>
      {/* 요즘 뜨는 이벤트 섹션 */}
      <div className="relative w-full px-6 mb-8 ">
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
          <button
            onClick={() => handlePrev(setTrendingStartIndex, trendingStartIndex, trendingEvents.length)}
            className="absolute text-gray-500 rounded-full shadow-md sm:text-xs md:text-sm lg:text-md sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 sm:left-3 md:left-2.5 lg:left-2 bg-gray-50 top-1/2"
          >
            &lt;
          </button>
        )}
        <button
          onClick={() => handleNext(setTrendingStartIndex, trendingStartIndex, trendingEvents.length)}
          className="absolute text-gray-500 rounded-full shadow-md sm:text-xs md:text-sm lg:text-md sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 sm:right-3 md:right-2.5 lg:right-2 bg-gray-50 top-1/2"
        >
          &gt;
        </button>
      </div>

      {/* 곧 마감되는 이벤트 섹션 */}
      <div className="relative w-full px-6 mb-8 ">
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
          <button
            onClick={() => handlePrev(setClosingStartIndex, closingStartIndex, closingSoonEvents.length)}
            className="absolute text-gray-500 rounded-full shadow-md sm:text-xs md:text-sm lg:text-md sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 sm:left-3 md:left-2.5 lg:left-2 bg-gray-50 top-1/2"
          >
            &lt;
          </button>
        )}
        <button
          onClick={() => handleNext(setClosingStartIndex, closingStartIndex, closingSoonEvents.length)}
          className="absolute text-gray-500 rounded-full shadow-md sm:text-xs md:text-sm lg:text-md sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 sm:right-3 md:right-2.5 lg:right-2 bg-gray-50 top-1/2"
        >
          &gt;
        </button>
      </div>
      <button
        onClick={handleAllEventsButtonClick}
        className="flex items-center justify-center text-white bg-black lg:px-7 lg:py-3 md:px-6 md:py-3 sm:px-5 sm:py-2.5 rounded-3xl sm:text-xs md:text-sm lg:text-base"
      >
        전체 이벤트 보러가기 <span className="ml-1.5">&gt;</span>
      </button>
      <BottomBar />
    </div>
  );
};
export default MainPage;
