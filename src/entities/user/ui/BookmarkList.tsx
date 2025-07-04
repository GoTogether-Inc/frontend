import { useNavigate } from 'react-router-dom';
import bookmark from '../../../../public/assets/bottomBar/Bookmark.svg';
import { useBookmarks } from '../../../features/bookmark/hook/useBookmarkHook';
import { formatDate } from '../../../shared/lib/date';
import EventInfo from './EventInfo';

const BookmarkList = () => {
  const { data } = useBookmarks();
  const navigate = useNavigate();

  const sortedData = data ? [...data].sort((a, b) => a.id - b.id) : [];
  const visibleEvents = sortedData.slice(0, 2);

  return (
    <div className="w-full h-full max-h-84 bg-white border-[0.5px] rounded-[10px] px-7 py-5">
      <div className="flex flex-col gap-6 h-full">
        <div className="flex items-center gap-3">
          <img src={bookmark} alt="북마크 아이콘" className="w-6 h-6" />
          <h1 className="text-22 font-bold">관심 이벤트</h1>
        </div>
        {visibleEvents.length > 0 ? (
          visibleEvents.map(event => (
            <EventInfo
              key={event.id}
              eventImageUrl={event.bannerImageUrl}
              title={event.title}
              date={formatDate(event.startDate)}
              onClick={() => navigate(`/event-details/${event.id}`)}
            />
          ))
        ) : (
          <p className="text-center text-sm md:text-base text-gray-500">관심 있는 이벤트가 없습니다.</p>
        )}
        <span
          onClick={() => navigate('/bookmark')}
          className="text-center text-main cursor-pointer font-semibold text-sm"
        >
          전체 관심 이벤트 보기
        </span>
      </div>
    </div>
  );
};
export default BookmarkList;
