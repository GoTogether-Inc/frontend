import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventCard from '../../../shared/ui/EventCard';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';

const AllEventsPage = () => {
  const trendingEvents = [
    {
      img: firstPage,
      eventTitle: 'Tech Conference 2025',
      dDay: 'D-3',
      host: 'Tech World',
      eventDate: '2025-01-20',
      location: 'Seoul, Korea',
      hashtags: ['#Tech', '#Innovation', '#Conference'],
    },
    {
      img: secondPage,
      eventTitle: 'Startup Meetup',
      dDay: 'D-10',
      host: 'Startup Hub',
      eventDate: '2025-01-27',
      location: 'Busan, Korea',
      hashtags: ['#Startup', '#Networking', '#Innovation'],
    },
    {
      img: thirdPage,
      eventTitle: 'AI Summit 2025',
      dDay: 'D-5',
      host: 'AI Korea',
      eventDate: '2025-01-22',
      location: 'Daegu, Korea',
      hashtags: ['#AI', '#MachineLearning', '#Tech'],
    },
    {
      img: firstPage,
      eventTitle: 'Developer Festival',
      dDay: 'D-15',
      host: 'Dev Korea',
      eventDate: '2025-02-01',
      location: 'Incheon, Korea',
      hashtags: ['#Developer', '#Coding', '#Festival'],
    },
  ];
  return (
    <div className="flex flex-col items-center mb-28">
      <Header
        centerContent={<SearchTextField icon={searchIcon} onChange={() => {}} placeholder="입력해주세요" />}
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => {}}
        leftButtonLabel="같이가요"
        rightContent={<SecondaryButton color="black" label="로그인" onClick={() => {}} />}
      />
      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-6 mt-6 md:grid-cols-2 lg:grid-cols-2">
        {trendingEvents.map((event, index) => (
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
      <BottomBar />
    </div>
  );
};
export default AllEventsPage;
