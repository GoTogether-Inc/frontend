import React, { ReactElement, ButtonHTMLAttributes } from 'react';
import TextButton from '../ui/Button/TextButton'; // TextButton 컴포넌트를 가져옵니다.

type Button = ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;

type CenterContent = string | ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;

interface HeaderProps {
  centerContent?: CenterContent; // 가운데 콘텐츠 (타이틀 or 검색창)
  leftButtonLabel?: string; // 왼쪽 콘텐츠 (버튼)
  leftButtonClick?: () => void; // 왼쪽 버튼 클릭 핸들러
  leftButtonClassName?: string; // 왼쪽 버튼 추가 스타일링 클래스
  rightContent?: Button; // 오른쪽 콘텐츠 (버튼)
  color?: 'white' | 'black'; // white 또는 black 중 선택
  className?: string; // 추가 스타일링 클래스
}

const Header = ({
  centerContent,
  leftButtonLabel,
  leftButtonClick = () => {},
  leftButtonClassName,
  rightContent,
  color = 'black',
  className = '',
}: HeaderProps) => {
  return (
    <header
      className={`relative flex items-center justify-between w-full h-16 px-6 gap-6 ${className} ${
        color === 'white' ? 'text-white' : 'text-black'
      }`}
    >
      {/* 왼쪽 콘텐츠 */}
      <div className="flex items-center space-x-2">
        {leftButtonLabel ? (
          <TextButton label={leftButtonLabel} onClick={leftButtonClick} className={leftButtonClassName} />
        ) : (
          <div className="w-4" />
        )}
      </div>

      {/* 가운데 콘텐츠 */}
      {typeof centerContent === 'string' ? (
        <div className="absolute inset-x-0 flex items-center justify-center">
          <h1 className="text-xl font-bold text-center sm:text-base md:text-lg lg:text-xl">{centerContent}</h1>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow">{centerContent}</div>
      )}

      {/* 오른쪽 콘텐츠 */}
      <div className="flex items-center space-x-2">{rightContent || <div className="w-4" />}</div>
    </header>
  );
};

export default Header;
