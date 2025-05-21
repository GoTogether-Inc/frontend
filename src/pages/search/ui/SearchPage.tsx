import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import { useState, useEffect, useRef } from 'react';
import SearchTermList from '../../../widgets/search/ui/SearchTermList';
import Banner from '../../../widgets/main/ui/Banner';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';
import EventCard from '../../../shared/ui/EventCard';
import ProfileCircle from '../../../../design-system/ui/Profile';
import useEventList from '../../../entities/event/hook/useEventListHook';
import useHostChannelList from '../../../entities/host/hook/useHostChannelListHook';
import { EventList } from '../../../features/event/model/event';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const { data, hasNextPage, isFetching, fetchNextPage } = useEventList();
  const { data: hostData } = useHostChannelList();
  const observerRef = useRef<IntersectionObserver>();
  const lastEventCardRef = useRef<HTMLDivElement | null>(null);

  /* const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ]; */

  const terms = [
    { number: 1, text: '우아콘' },
    { number: 2, text: '인프런' },
    { number: 3, text: '카카오 서밋' },
    { number: 4, text: '고예진 인성 논란' },
    { number: 5, text: '우아한형제들' },
  ];

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
            placeholder="검색어를 입력하세요."
            type="text"
            onChange={changeInputKeyword}
          />
        }
        leftButtonClassName="text-xl hover:no-underline"
        leftButtonClick={() => navigate(-1)}
        leftButtonLabel="<"
      />
      {keyword ? (
        <>
          <div className="px-6 flex flex-col gap-8">
            <div>
              <p className="font-bold text-lg lg:text-xl mb-3">이벤트</p>
              <div className="grid grid-cols-2 gap-4">
                {data?.pages.map((page, pageIndex) =>
                  page.items
                    .filter(
                      (event: EventList) =>
                        event.title.toLowerCase().includes(keyword.toLowerCase()) ||
                        event.address.toLowerCase().includes(keyword.toLowerCase()) ||
                        event.hostChannelName.toLowerCase().includes(keyword.toLowerCase())
                    )
                    .map((event: EventList, eventIndex) => {
                      const isLastElement = pageIndex === data.pages.length - 1 && eventIndex === page.items.length - 1;
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
                          />
                        </div>
                      );
                    })
                )}
              </div>
              {isFetching && <div className="text-center py-4">Loading...</div>}
            </div>

            {/* 호스트 검색 결과를 렌더링 하는 부분 */}
            <div>
              <p className="font-bold pb-3 text-lg lg:text-xl mb-3">호스트</p>
              <div className="flex flex-wrap gap-9 px-2 mb-10">
                {hostData?.result
                  .filter(host => host.hostChannelName.toLowerCase().includes(keyword.toLowerCase()))
                  .map(host => (
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
          </div>

          {!hostData?.result.some(host => host.hostChannelName.toLowerCase().includes(keyword.toLowerCase())) &&
            !data?.pages.some(page =>
              page.items.some(
                event =>
                  event.title.toLowerCase().includes(keyword.toLowerCase()) ||
                  event.address.toLowerCase().includes(keyword.toLowerCase()) ||
                  event.hostChannelName.toLowerCase().includes(keyword.toLowerCase())
              )
            ) && <div className="p-6 text-center font-semibold text-gray-700">검색 결과가 없습니다.</div>}
        </>
      ) : (
        <div className="px-6">
          <SearchTermList items={terms} highlightColor="blue" title="인기 검색어" time="11.10 15:00" />
          <SearchTermList items={terms} highlightColor="red" title="급상승 검색어" time="11.10 15:00" />
          {/* <Banner images={images} interval={4000} /> */}
        </div>
      )}
    </>
  );
};

export default SearchPage;
