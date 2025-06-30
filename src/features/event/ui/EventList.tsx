import { VirtuosoGrid } from 'react-virtuoso';
import { useNavigate } from 'react-router-dom';
import { useInfiniteScroll } from '../../../shared/hooks/useInfiniteScroll';
import EventCard from '../../../shared/ui/EventCard';
import { BaseEvent, CategoryType, TagType } from '../../../shared/types/baseEventType';
import { getAllEventsInfinite, getCategoryEventsInfinite } from '../../../entities/event/api/event';
interface EventListProps extends BaseEvent {
  id: number;
  hostChannelName: string;
  remainDays: string;
}

interface EventListComponentProps {
  category?: CategoryType;
  tag?: TagType;
}

const categoryToKorean: Record<CategoryType, string> = {
  DEVELOPMENT_STUDY: '개발 스터디',
  NETWORKING: '네트워킹',
  HACKATHON: '해커톤',
  CONFERENCE: '컨퍼런스',
};

const EventList = ({ category, tag }: EventListComponentProps) => {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll<EventListProps>({
    queryKey: ['events', 'infinite', category ?? '', tag ?? ''],
    queryFn: params => {
      if (category) {
        return getCategoryEventsInfinite({ ...params, category });
      }
      return getAllEventsInfinite({ ...params, tag });
    },
    size: 10,
    filters: { tag, category },
  });

  const flatEvents = data?.pages.flatMap(page => page.items) ?? [];

  if (flatEvents.length === 0) {
    return (
      <div className="sm:text-12 md:text-14 lg:text-16 py-8 text-placeholderText ">
        {tag ? (
          <div>열린 이벤트가 없습니다.</div>
        ) : category ? (
          <div>열린 {categoryToKorean[category]} 이벤트가 없습니다.</div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <VirtuosoGrid
        style={{ height: '80vh', width: '90%', margin: '0 auto' }}  // 높이 명시 필수!
        useWindowScroll={true}  // 전체 창 스크롤 아니라면 false 권장
        data={flatEvents}
        endReached={() => {
          if (hasNextPage && !isFetching) fetchNextPage();
        }}
        overscan={200}
        listClassName="flex flex-wrap justify-between"
        itemClassName="w-[48%] mb-4 cursor-pointer"
        itemContent={(_index, event) => (
          <EventCard
            key={event.id}
            id={event.id}
            img={event.bannerImageUrl}
            eventTitle={event.title}
            eventDate={event.startDate}
            location={event.address}
            host={event.hostChannelName}
            hashtags={event.hashtags}
            dDay={event.remainDays}
            onClick={() => navigate(`/event-details/${event.id}`)}
          />
        )}
      />

      {isFetching && <div className="text-center py-4">Loading...</div>}
    </>
  );
};

export default EventList;
