import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../../shared/ui/EventCard';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import rightButton from '../../../../public/assets/main/RightButton.svg';
import leftButton from '../../../../public/assets/main/LeftButton.svg';
import { EventItem } from '../../../entities/event/model/event';

interface EventSliderSectionProps {
  title: string;
  events: EventItem[];
}

const EventSliderSection = ({ title, events }: EventSliderSectionProps) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const maxCardsToShow = 2;
  const navigate = useNavigate();

  console.log(events);

  type SetStartIndex = Dispatch<SetStateAction<number>>;

  const handleNext = (setStartIndex: SetStartIndex, currentIndex: number, eventsLength: number): void => {
    setStartIndex((currentIndex + 1) % eventsLength);
  };

  const handlePrev = (setStartIndex: SetStartIndex, currentIndex: number, eventsLength: number): void => {
    setStartIndex((currentIndex - 1 + eventsLength) % eventsLength);
  };

  return (
    <div className="relative w-full px-6">
      <h2 className="sm:mb-3 md:mb-3.5 lg:mb-4 font-bold sm:text-sm md:text-base lg:text-lg">{title}</h2>
      <div className="flex gap-4">
        {events.length === 0 ? (
          <div className="w-full text-center text-gray-500">표시할 이벤트가 없습니다.</div>
        ) : (
          events
            .slice(startIndex, startIndex + maxCardsToShow)
            .concat(
              startIndex + maxCardsToShow > events.length
                ? events.slice(0, (startIndex + maxCardsToShow) % events.length)
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
            ))
        )}
      </div>
      {startIndex !== 0 && (
        <IconButton
          iconPath={<img src={leftButton} alt="왼쪽 버튼" className="absolute top-1/2 left-0.5" />}
          onClick={() => handlePrev(setStartIndex, startIndex, events.length)}
        />
      )}
      <IconButton
        iconPath={<img src={rightButton} alt="오른쪽 버튼" className="absolute top-1/2 right-0.5" />}
        onClick={() => handleNext(setStartIndex, startIndex, events.length)}
      />
    </div>
  );
};

export default EventSliderSection;
