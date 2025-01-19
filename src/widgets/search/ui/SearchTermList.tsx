import React from 'react';
import SearchTerm from './SearchTerm';

interface SearchTermListProps {
  items: {
    number: number;
    text: string;
  }[]; // 리스트 아이템 배열
  highlightColor: string; // 첫 세 항목에 적용할 색상
  title: string; // 제목 (예: 인기 검색어)
  time: string; // 시간 (예: 11.10 15:00)
}

const SearchTermList = ({ items, highlightColor, title, time }: SearchTermListProps) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-sm">{title}</span>
        <span className="text-xs">
          <span>{time}</span>, 기준
        </span>
      </div>
      {items.map((item, index) => (
        <SearchTerm
          key={index}
          number={item.number}
          text={item.text}
          color={index < 3 ? highlightColor : undefined} // 첫 세 항목에만 색상 적용
        />
      ))}
    </div>
  );
};

export default SearchTermList;
