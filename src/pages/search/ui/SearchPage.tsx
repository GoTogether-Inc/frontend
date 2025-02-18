import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import { useState, useEffect, useRef } from 'react';
import SearchTermList from '../../../widgets/search/ui/SearchTermList';
import Banner from '../../../widgets/main/ui/Banner';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';
import EventCard from '../../../shared/ui/EventCard';
import HostLogo from '../../../../public/assets/menu/HostLogo.svg';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [filterData, setFilterDate] = useState({});
  //@TODO:추후에 response body 보고 Type 설정

  const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ];

  const terms = [
    { number: 1, text: '우아콘' },
    { number: 2, text: '인프런' },
    { number: 3, text: '카카오 서밋' },
    { number: 4, text: '고예진 인성 논란' },
    { number: 5, text: '우아한형제들' },
  ];

  useEffect(() => {
    //@TODO:API 호출 후, response를 setFilterDate에 넣을 예정
    //현재는 목업 데이터를 넣어놓음
    //@TODO:API 연동하며 디바운스 구현 예정
    setFilterDate({
      Events: [
        {
          img: firstPage,
          eventTitle: '1인프콘 2024 - INFCON 2024',
          dDay: 'D-1',
          host: '인프런',
          eventDate: '2025년 1월 13일',
          location: '올림픽 공원',
          hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
        },
        {
          img: secondPage,
          eventTitle: '2인프콘 2024 - INFCON 2024',
          dDay: 'D-1',
          host: '인프런',
          eventDate: '2025년 1월 13일',
          location: '올림픽 공원',
          hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
        },
        {
          img: thirdPage,
          eventTitle: '3인프콘 2024 - INFCON 2024',
          dDay: 'D-1',
          host: '인프런',
          eventDate: '2025년 1월 13일',
          location: '올림픽 공원',
          hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
        },
        {
          img: firstPage,
          eventTitle: '1인프콘 2024 - INFCON 2024',
          dDay: 'D-1',
          host: '인프런',
          eventDate: '2025년 1월 13일',
          location: '올림픽 공원',
          hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
        },
        {
          img: secondPage,
          eventTitle: '2인프콘 2024 - INFCON 2024',
          dDay: 'D-1',
          host: '인프런',
          eventDate: '2025년 1월 13일',
          location: '올림픽 공원',
          hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
        },
        {
          img: thirdPage,
          eventTitle: '3인프콘 2024 - INFCON 2024',
          dDay: 'D-1',
          host: '인프런',
          eventDate: '2025년 1월 13일',
          location: '올림픽 공원',
          hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
        },
      ],
      Host: [{ name: 'Techeer' }, { name: 'Techeer' }, { name: 'Techeer' }, { name: 'Techeer' }],
    });
  }, [keyword]);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null); // Input 요소를 참조하기 위한 훅

  const handlePreviousButton = () => {
    navigate('/');
  };

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
    <div>
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
        leftButtonClick={handlePreviousButton}
        leftButtonLabel="<"
      />
      {keyword ? (
        <>
          <div className="p-6 flex flex-col gap-24">
            {/* 이벤트 검색 결과를 렌더링 하는 부분 */}
            {filterData.Events?.length > 0 && (
              <div>
                <p className="text-xl font-bold sm:text-sm md:text-lg lg:text-xl mb-3">이벤트</p>
                <div className="grid grid-cols-2 gap-4">
                  {filterData.Events?.map((event, index) => (
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
              </div>
            )}

            {/* 호스트 검색 결과를 렌더링 하는 부분 */}
            {filterData.Host?.length > 0 && (
              <div>
                <p className="text-xl font-bold pb-3 sm:text-sm md:text-lg lg:text-xl mb-3">호스트</p>
                <div className="grid grid-cols-4 gap-4">
                  {filterData?.Host.map((host, index) => (
                    <button key={index} className="flex flex-col items-center justify-center">
                      <img src={HostLogo} alt={host.name} className="w-16 h-16" />
                      <p>{host.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!filterData.Host?.length && !filterData.Event?.length && (
            <div className="p-6 text-center font-semibold text-gray-700">검색 결과가 없습니다.</div>
          )}
        </>
      ) : (
        <div className="px-6">
          <SearchTermList items={terms} highlightColor="blue" title="인기 검색어" time="11.10 15:00" />
          <SearchTermList items={terms} highlightColor="red" title="급상승 검색어" time="11.10 15:00" />
          <Banner images={images} interval={4000} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
