import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventCard from '../../../shared/ui/EventCard';
import { trendingEvents } from '../../../shared/types/eventCardType';
import { useNavigate } from 'react-router-dom';

const AllEventsPage = () => {
  const navigater = useNavigate();

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
        leftButtonClick={() => {}}
        leftButtonLabel="같이가요"
        rightContent={<SecondaryButton color="black" label="로그인" onClick={() => {}} />}
      />
      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-6 mt-2 md:grid-cols-2 lg:grid-cols-2">
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
