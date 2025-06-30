import { useRef, useEffect, useState } from 'react';
import { useInfiniteScroll } from '../../../shared/hooks/useInfiniteScroll';
import { getAllEventsInfinite, getCategoryEventsInfinite } from '../../../entities/event/api/event';
import EventCard from '../../../shared/ui/EventCard';
import { BaseEvent, CategoryType, TagType } from '../../../shared/types/baseEventType';
import { useNavigate } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';

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

  const MOBILE_CARD_HEIGHT = 250;
  const DESKTOP_CARD_HEIGHT = 330;


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
  const parentRef = useRef<HTMLDivElement>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);

  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth < 768;

  const [rowHeight, setRowHeight] = useState(isMobile ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT);

  useEffect(() => {
    if (!firstRowRef.current) return;
    requestAnimationFrame(() => {
      const measuredHeight = firstRowRef.current!.offsetHeight;
      if (measuredHeight && measuredHeight !== rowHeight) {
        setRowHeight(measuredHeight);
      }
    });
  }, [flatEvents, windowWidth]);

  const rowCount = Math.ceil(flatEvents.length / 2);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => isMobile ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT,
    measureElement: el => el.getBoundingClientRect().height,
    overscan: 5,
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (virtualItems.length === 0) return;

    const lastVirtualItem = virtualItems[virtualItems.length - 1];
    if (lastVirtualItem.index >= rowCount - 1 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [rowVirtualizer.getVirtualItems(), rowCount, hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      {flatEvents.length === 0 ? (
        <div className="sm:text-12 md:text-14 lg:text-16 py-8 text-placeholderText ">
          {tag ? (
            <div>열린 이벤트가 없습니다.</div>
          ) : category ? (
            <div>열린 {categoryToKorean[category]} 이벤트가 없습니다.</div>
          ) : null}
        </div>
      ) : (
        <div
          ref={parentRef}
          className="relative w-[90%] mx-auto "
          role="region"
          aria-label="이벤트 목록"
          tabIndex={0}
        >
          <div
            style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}
            className="relative"
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const firstIndex = virtualRow.index * 2;
              const secondIndex = firstIndex + 1;

              const items = [flatEvents[firstIndex], flatEvents[secondIndex]].filter(Boolean);

              return (
                <div
                  key={virtualRow.index}
                  ref={virtualRow.index === 0 ? firstRowRef : null}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  {items.map(event => (
                    <div
                      key={event.id}
                      onClick={() => navigate(`/event-details/${event.id}`)}
                    >
                      <EventCard
                        id={event.id}
                        img={event.bannerImageUrl}
                        eventTitle={event.title}
                        eventDate={event.startDate}
                        location={event.address}
                        host={event.hostChannelName}
                        hashtags={event.hashtags}
                        dDay={event.remainDays}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isFetching && <div className="text-center py-4">Loading...</div>}
    </>
  );
};

export default EventList;
