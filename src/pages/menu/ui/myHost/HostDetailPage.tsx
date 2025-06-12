import { useNavigate, useParams } from 'react-router-dom';
import HostDetailLayout from '../../../../shared/ui/backgrounds/HostDetailLayout';
import EventCard from '../../../../shared/ui/EventCard';
import useHostDetail from '../../../../entities/host/hook/useHostDetailHook';

const HostDetailPage = () => {
  const navigate = useNavigate();
  // URL에서 hostId를 가져오기
  const { id } = useParams<{ id: string }>();

  const hostChannelId = Number(id);
  const { data } = useHostDetail(hostChannelId);
  const events = data?.result.events ?? [];

  return (
    <HostDetailLayout
      rightContent={
        <button onClick={() => navigate(`/menu/hostEdit/${id}`)} className="text-xs cursor-pointer">
          수정하기
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-4 mx-5 mt-3 md:grid-cols-2 lg:grid-cols-2 z-50">
        {events.length === 0 ? (
          <p className="col-span-2 text-center text-gray-500 mt-10">
            등록된 이벤트가 없습니다.
          </p>
        ) : (
          events.map(event => (
            <EventCard
              id={event.id}
              key={event.id}
              img={event.bannerImageUrl}
              eventTitle={event.title}
              dDay={event.remainDays}
              host={event.hostChannelName}
              eventDate={event.startDate}
              location={event.onlineType}
              hashtags={event.hashtags}
              aspectRatio='md:aspect-[3/4.7] sm:aspect-[1/1.8]'
            />
          ))
        )}
      </div>
    </HostDetailLayout>
  );
};

export default HostDetailPage;
