import React from 'react';
import SearchBar from '../../../shared/ui/SearchBar';
import BlackButton from '../../../shared/ui/BlackButton';
import ProfileImage from '../../../shared/ui/ProfileImage';

const Header: React.FC = () => {
  const isLoggedIn = false;

  return (
    <div className="flex justify-between items-center w-full h-20">
      <h1 className="font-nexon text-lg md:text-2xl ml-3 md:ml-5 flex-wrap whitespace-nowrap">같이가요</h1>
      <div className="p-4 md:p-6 w-full">
        <SearchBar className="w-full" placeholder="검색어를 입력해주세요." />
      </div>
      {!isLoggedIn ? (
        <div className="mr-3 md:mr-5 text-sm md:text-md">
          <BlackButton width="w-16" height="h-10" text="로그인" />
        </div>
      ) : (
        <div className="mr-3 md:mr-5">
          <ProfileImage width="w-10" height="h-10" textSize="text-sm md:text-md" name="예진" />
        </div>
      )}
    </div>
  );
};
export default Header;
