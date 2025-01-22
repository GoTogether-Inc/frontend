import { useNavigate, useParams } from 'react-router-dom';
import HostDetailLayout from '../../../shared/ui/backgrounds/HostDetailLayout';
import { trendingEvents } from '../../../shared/types/eventCardType';
import EventCard from '../../../shared/ui/EventCard';

const HostDetailPage = () => {
  const navigate = useNavigate();
  // URL에서 hostId를 가져오기
  const { id } = useParams<{ id: string }>();

  // hostId에 해당하는 이벤트들만 필터링
  const filteredEvents = trendingEvents.filter(event => event.id === Number(id));

  const handleClick = () => {
    navigate(`/menu/hostEdit/${id}`);
  };
  return (
    <HostDetailLayout
      rightContent={
        <button onClick={handleClick} className="text-xs cursor-pointer">
          수정하기
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-4 mx-5 mt-3 md:grid-cols-2 lg:grid-cols-2 z-50">
        {filteredEvents.map((event, index) => (
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
    </HostDetailLayout>
  );
};

export default HostDetailPage;
