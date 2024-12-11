import React from 'react';

interface HeaderProps {
  title: string; // 헤더 제목
  onBack?: () => void; // 뒤로 가기 버튼 클릭 핸들러
  className: string;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, className }) => {
  return (
    <header
      className={`flex items-center justify-between w-full h-16 px-4 ${className}`}
      style={{ margin: '0 auto' }} // 중앙 정렬을 위한 스타일
    >
      {/* 뒤로 가기 버튼 (필요한 경우 표시) */}
      {onBack ? (
        <button className="text-2xl focus:outline-none" onClick={onBack}>
          &lt;
        </button>
      ) : (
        <div className="w-4" /> // 버튼 자리에 빈 공간 확보
      )}

      {/* 제목 */}
      <h1 className="flex-grow text-xl font-bold text-center sm:text-base md:text-lg lg:text-xl">{title}</h1>

      {/* 오른쪽 공간 (뒤로가기 버튼 없을 때 공간 확보) */}
      <div className="w-4" />
    </header>
  );
};

export default Header;

// border-b, hover:text-gray-400, text-gray-800 -> 필요한곳에 className로 직접 설정하기
