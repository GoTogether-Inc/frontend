import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import { useEffect, useRef } from 'react';
import SearchTermList from '../../../widgets/search/ui/SearchTermList';
import Banner from '../../../widgets/main/ui/Banner';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';

const SearchPage = () => {
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

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null); // Input 요소를 참조하기 위한 훅

  const handlePreviousButton = () => {
    navigate('/');
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
          />
        }
        leftButtonClassName="text-xl hover:no-underline"
        leftButtonClick={handlePreviousButton}
        leftButtonLabel="<"
      />
      <div className="px-6">
        <SearchTermList items={terms} highlightColor="blue" title="인기 검색어" time="11.10 15:00" />
        <SearchTermList items={terms} highlightColor="red" title="급상승 검색어" time="11.10 15:00" />
        <Banner images={images} interval={4000} />
      </div>
    </div>
  );
};

export default SearchPage;
