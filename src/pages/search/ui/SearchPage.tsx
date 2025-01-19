import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import { useEffect, useRef } from 'react';
import SearchTermList from '../../../widgets/search/ui/SearchTermList';

const SearchPage = () => {
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
        <SearchTermList items={terms} highlightColor="red" title="인기 검색어" time="11.10 15:00" />
      </div>
    </div>
  );
};

export default SearchPage;
