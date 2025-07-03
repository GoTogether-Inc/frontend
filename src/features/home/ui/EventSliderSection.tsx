import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../../shared/ui/EventCard';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import rightButton from '../../../../public/assets/main/RightButton.svg';
import leftButton from '../../../../public/assets/main/LeftButton.svg';
import { EventItem } from '../../../entities/event/model/eventDetail';

interface EventSliderSectionProps {
  title: string;
  events: EventItem[];
}

const EventSliderSection = ({ title, events }: EventSliderSectionProps) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const maxCardsToShow = 2;
  const navigate = useNavigate();

  type SetStartIndex = Dispatch<SetStateAction<number>>;

  const handleNext = (setStartIndex: SetStartIndex, currentIndex: number, eventsLength: number): void => {
    setStartIndex((currentIndex + 1) % eventsLength);
  };

  const handlePrev = (setStartIndex: SetStartIndex, currentIndex: number, eventsLength: number): void => {
    setStartIndex((currentIndex - 1 + eventsLength) % eventsLength);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter(event => {
    const endDate = new Date(event.endDate);
    endDate.setHours(0, 0, 0, 0);
    return endDate >= now;
  });

  const eventsToShow =
    filteredEvents.length > 0
      ? filteredEvents
        .slice(startIndex, startIndex + maxCardsToShow)
        .concat(
          startIndex + maxCardsToShow > filteredEvents.length
            ? filteredEvents.slice(0, (startIndex + maxCardsToShow) % filteredEvents.length)
            : []
        )
      : [];

  return (
    <div className="relative w-full px-6">
      <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">{title}</h2>
      <div className="flex gap-4 justify-center">
        {filteredEvents.length === 0 ? (
          <div className="w-full text-center text-gray-500">표시할 이벤트가 없습니다.</div>
        ) : (
          eventsToShow.map((event: EventItem) => (
            <div
              key={event.id}
              className="
                  h-full min-h-[200px]
                  lg:min-w-[220px]  sm:min-w-[160px] w-[100%] sm:w-[40%]
                  max-w-sm
                "
            >
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
                onlineType={event.onlineType}
                onClick={() => navigate(`/event-details/${event.id}`)}
              />
            </div>

          ))
        )}
        {eventsToShow.length === 1 && (
          <div className="w-full h-full min-h-[200px] max-w-sm opacity-0" aria-hidden="true">
            {/* 빈 카드로 자리 유지 */}
            <EventCard
              id={-1}
              img=""
              eventTitle=""
              dDay=""
              host=""
              eventDate=""
              location=""
              hashtags={[]}
              onClick={() => { }}
            />
          </div>
        )}
      </div>
      {startIndex !== 0 && (
        <IconButton
          className="absolute top-1/2 left-0.5"
          iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
          onClick={() => handlePrev(setStartIndex, startIndex, events.length)}
        />
      )}
      <IconButton
        className="absolute top-1/2 right-0.5"
        iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
        onClick={() => handleNext(setStartIndex, startIndex, events.length)}
      />
    </div>
  );
};

export default EventSliderSection;
