import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventCard from '../../../shared/ui/EventCard';
// import { trendingEvents } from '../../../shared/types/eventCardType';
import { eventApi } from '../../../shared/api/eventApi';
import { EventItem, EventNormalResponse } from '../../../shared/types/api/event';

const AllEventsPage = () => {
  const navigater = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadEvents = async (pageNum: number) => {
    try {
      setIsLoading(true);
      console.log('Fetching events with params:', { page: pageNum, size: 10 });
      const response: EventNormalResponse = await eventApi.getEventByTag('current', { page: pageNum, size: 10 });
      console.log('API Response:', response);

      if (response?.result && Array.isArray(response.result)) {
        console.log('Total events received:', response.result.length);

        if (response.result.length === 0) {
          console.log('No more events to load');
          setHasMore(false);
        } else {
          if (pageNum === 0) {
            console.log('Setting initial events');
            setEvents(response.result);
          } else {
            console.log('Adding more events');
            setEvents(prev => {
              // 중복 제거
              const newEvents = response.result.filter(
                newEvent => !prev.some(existingEvent => existingEvent.id === newEvent.id)
              );
              console.log('New events to add:', newEvents.length);
              return [...prev, ...newEvents];
            });
          }
          setPage(pageNum);
        }
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

  const lastEventRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Loading next page:', page + 1);
          loadEvents(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page]
  );

  useEffect(() => {
    loadEvents(0);
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
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
      <div className="grid grid-cols-2 gap-4 mx-6 mt-2 md:grid-cols-2 lg:grid-cols-2">
        {events.map((event, index) => (
          <div key={event.id} ref={index === events.length - 1 ? lastEventRef : undefined}>
            <EventCard
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
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="text-center p-4" ref={loadingRef}>
          이벤트 불러오는 중...ㅎ
        </div>
      )}
      {error && <div className="text-center p-4 text-red-500">{error}</div>}
      {!hasMore && !isLoading && events.length > 0 && (
        <div className="text-center p-4 text-gray-500">더 이상 표시할 이벤트가 없습니다.</div>
      )}
      {!isLoading && events.length === 0 && (
        <div className="text-center p-4 text-gray-500">표시할 이벤트가 없습니다.</div>
      )}
      <BottomBar />
    </div>
  );
};

export default AllEventsPage;
