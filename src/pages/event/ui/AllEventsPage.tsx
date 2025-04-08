import { useState, useEffect } from 'react';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventCard from '../../../shared/ui/EventCard';
// import { trendingEvents } from '../../../shared/types/eventCardType';
import { useNavigate } from 'react-router-dom';
import { eventApi } from '../../../shared/api/eventApi';
import { EventItem, EventNormalResponse } from '../../../shared/types/api/event';

const AllEventsPage = () => {
  const navigater = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response: EventNormalResponse = await eventApi.getEventByTag('current', { page: 0, size: 20 });
        console.log('Full API Response:', JSON.stringify(response, null, 2));
        console.log('First event data:', response?.result?.[0]);

        if (response?.result && Array.isArray(response.result)) {
          console.log(
            'Event Images:',
            response.result.map(event => ({
              id: event.id,
              bannerImageUrl: event.bannerImageUrl,
            }))
          );
          setEvents(response.result);
        } else {
          console.error('Invalid response format:', response);
          setError('이벤트 데이터 형식이 올바르지 않습니다.');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('이벤트를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
        rightContent={<SecondaryButton size="large" color="black" label="로그인" onClick={() => {}} />}
      />
      {isLoading ? (
        <div className="text-center p-4">이벤트 불러오는 중...ㅎ</div>
      ) : error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mx-6 mt-2 md:grid-cols-2 lg:grid-cols-2">
            {events.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                img={event.bannerImageUrl || ''}
                eventTitle={event.title}
                dDay={event.remainDays}
                host={event.hostChannelName}
                eventDate={event.startDate}
                location={event.address}
                hashtags={event.hashtags}
                onClick={() => navigater(`/event/${event.id}`)}
              />
            ))}
          </div>
        </>
      )}
      <BottomBar />
    </div>
  );
};
export default AllEventsPage;
