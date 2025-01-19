import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import { useEffect, useRef } from 'react';

const SearchPage = () => {
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
      <div className="flex justify-between w-full px-6">
        <span>인기 검색어</span>
        <span>
          <span>11.10 15:00</span>, 기준
        </span>
      </div>
    </div>
  );
};

export default SearchPage;
