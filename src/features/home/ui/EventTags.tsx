import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventByTag } from '../../../entities/event/api/event';
import { useQuery } from '@tanstack/react-query';
import { EventItem } from '../../../entities/event/model/event';
import EventCard from '../../../shared/ui/EventCard';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import rightButton from '../../../../public/assets/main/RightButton.svg';
import leftButton from '../../../../public/assets/main/LeftButton.svg';

const EventTag = () => {
  // API 호출을 위한 React Query 설정
  const { data: latestEvents = { result: [] } } = useQuery({
    queryKey: ['events', 'latest'],
    queryFn: () => getEventByTag('current', { page: 0, size: 10 }),
  });

  const { data: trendingEvents = { result: [] } } = useQuery({
    queryKey: ['events', 'trending'],
    queryFn: () => getEventByTag('popular', { page: 0, size: 10 }),
  });

  const { data: closingSoonEvents = { result: [] } } = useQuery({
    queryKey: ['events', 'closing'],
    queryFn: () => getEventByTag('deadline', { page: 0, size: 10 }),
  });

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
    <>
      {/* 최신 이벤트 섹션 */}
      <div className="relative w-full px-6">
        <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">최신 이벤트</h2>
        <div className="flex gap-4">
          {latestEvents.result
            .slice(latestStartIndex, latestStartIndex + maxCardsToShow)
            .concat(
              latestStartIndex + maxCardsToShow > latestEvents.result.length
                ? latestEvents.result.slice(0, (latestStartIndex + maxCardsToShow) % latestEvents.result.length)
                : []
            )
            .map((event: EventItem) => (
              <EventCard
                key={event.id}
                id={event.id}
                img={event.bannerImageUrl}
                eventTitle={event.title}
                dDay={event.remainDays}
                host={event.hostChannelName}
                eventDate={event.startDate}
                location={event.address}
                hashtags={event.hashtags}
                onClick={() => navigate(`/event-details/${event.id}`)}
              />
            ))}
        </div>
        {latestStartIndex !== 0 && (
          <IconButton
            iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
            onClick={() => handlePrev(setLatestStartIndex, latestStartIndex, latestEvents.result.length)}
          />
        )}
        <IconButton
          iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
          onClick={() => handleNext(setLatestStartIndex, latestStartIndex, latestEvents.result.length)}
        />
      </div>

      {/* 요즘 뜨는 이벤트 섹션 */}
      <div className="relative w-full px-6">
        <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">요즘 뜨는 이벤트</h2>
        <div className="flex gap-4">
          {trendingEvents.result
            .slice(trendingStartIndex, trendingStartIndex + maxCardsToShow)
            .concat(
              trendingStartIndex + maxCardsToShow > trendingEvents.result.length
                ? trendingEvents.result.slice(0, (trendingStartIndex + maxCardsToShow) % trendingEvents.result.length)
                : []
            )
            .map((event: EventItem) => (
              <EventCard
                key={event.id}
                id={event.id}
                img={event.bannerImageUrl}
                eventTitle={event.title}
                dDay={event.remainDays}
                host={event.hostChannelName}
                eventDate={event.startDate}
                location={event.address}
                hashtags={event.hashtags}
                onClick={() => navigate(`/event-details/${event.id}`)}
              />
            ))}
        </div>
        {trendingStartIndex !== 0 && (
          <IconButton
            iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
            onClick={() => handlePrev(setTrendingStartIndex, trendingStartIndex, trendingEvents.result.length)}
          />
        )}
        <IconButton
          iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
          onClick={() => handleNext(setTrendingStartIndex, trendingStartIndex, trendingEvents.result.length)}
        />
      </div>

      {/* 곧 마감되는 이벤트 섹션 */}
      <div className="relative w-full px-6">
        <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">
          곧 이벤트가 마감돼요! ⏰
        </h2>
        <div className="flex gap-4">
          {closingSoonEvents.result
            .slice(closingStartIndex, closingStartIndex + maxCardsToShow)
            .concat(
              closingStartIndex + maxCardsToShow > closingSoonEvents.result.length
                ? closingSoonEvents.result.slice(
                    0,
                    (closingStartIndex + maxCardsToShow) % closingSoonEvents.result.length
                  )
                : []
            )
            .map((event: EventItem) => (
              <EventCard
                key={event.id}
                id={event.id}
                img={event.bannerImageUrl}
                eventTitle={event.title}
                dDay={event.remainDays}
                host={event.hostChannelName}
                eventDate={event.startDate}
                location={event.address}
                hashtags={event.hashtags}
                onClick={() => navigate(`/event-details/${event.id}`)}
              />
            ))}
        </div>
        {closingStartIndex !== 0 && (
          <IconButton
            iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
            onClick={() => handlePrev(setClosingStartIndex, closingStartIndex, closingSoonEvents.result.length)}
          />
        )}
        <IconButton
          iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
          onClick={() => handleNext(setClosingStartIndex, closingStartIndex, closingSoonEvents.result.length)}
        />
      </div>
    </>
  );
};

export default EventTag;
