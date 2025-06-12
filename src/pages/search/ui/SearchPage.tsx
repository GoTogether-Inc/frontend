import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import { useState, useEffect, useRef } from 'react';
import EventCard from '../../../shared/ui/EventCard';
import ProfileCircle from '../../../../design-system/ui/Profile';
import useEventList from '../../../entities/event/hook/useEventListHook';
import useHostChannelList from '../../../entities/host/hook/useHostChannelListHook';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const { data, hasNextPage, isFetching, fetchNextPage } = useEventList();
  const { data: hostData } = useHostChannelList();
  const observerRef = useRef<IntersectionObserver>();
  const lastEventCardRef = useRef<HTMLDivElement | null>(null);

  const filteredEvents =
    data?.pages.flatMap(page =>
      page.items.filter(event =>
        keyword
          ? event.title.toLowerCase().includes(keyword.toLowerCase()) ||
            event.address.toLowerCase().includes(keyword.toLowerCase()) ||
            event.hostChannelName.toLowerCase().includes(keyword.toLowerCase())
          : true
      )
    ) ?? [];

  const filteredHosts =
    hostData?.result.filter(host =>
      keyword ? host.hostChannelName.toLowerCase().includes(keyword.toLowerCase()) : true
    ) ?? [];

  useEffect(() => {
    if (!hasNextPage || isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (lastEventCardRef.current) observerRef.current.observe(lastEventCardRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null); // Input 요소를 참조하기 위한 훅

  const changeInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // 페이지 로드 시 Input에 포커스 설정
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Header
        centerContent={
          <input
            ref={inputRef}
            className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-main"
            placeholder="검색어를 입력해주세요."
            type="text"
            onChange={changeInputKeyword}
          />
        }
        leftButtonClassName="text-xl hover:no-underline"
        leftButtonClick={() => navigate(-1)}
        leftButtonLabel="<"
      />
      <div className="px-6 flex flex-col gap-8">
        {/* 이벤트 섹션 */}
        <div>
          <p className="font-bold text-lg lg:text-xl mb-3">이벤트</p>
          <div className="grid grid-cols-2 gap-4">
            {filteredEvents.map((event, index) => {
              const isLastElement = index === filteredEvents.length - 1;
              return (
                <div key={event.id} ref={isLastElement ? lastEventCardRef : null}>
                  <EventCard
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
                </div>
              );
            })}
          </div>
          {isFetching && <div className="text-center py-4">Loading...</div>}
        </div>

        {/* 호스트 섹션 */}
        <div>
          <p className="font-bold pb-3 text-lg lg:text-xl mb-3">호스트</p>
          <div className="flex flex-wrap gap-9 px-2 mb-10">
            {filteredHosts.map(host => (
              <ProfileCircle
                key={host.id}
                id={host.id}
                profile="hostInfoProfile"
                name={host.hostChannelName}
                profileImageUrl={host.profileImageUrl}
                onClick={() => navigate(`/menu/hostInfo/${host.id}`)}
                className="w-19 h-19 md:w-20 md:h-20 text-sm md:text-16 lg:text-base"
              />
            ))}
          </div>
        </div>

        {/* 검색 결과 없음 안내 */}
        {filteredEvents.length === 0 && filteredHosts.length === 0 && (
          <div className="p-6 text-center font-semibold text-gray-700">검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
