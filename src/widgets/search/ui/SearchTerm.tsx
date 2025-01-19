import React from 'react';

interface SearchTermProps {
  number: number;
  text: string;
  color?: string; // 색상을 선택적으로 받음
}

const SearchTerm: React.FC<SearchTermProps> = ({ number, text, color }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="sm:text-xs md:text-sm lg:text-base" style={{ color }}>
        {number}
      </span>
      <span className="sm:text-xs md:text-sm lg:text-sm">{text}</span>
    </div>
  );
};

export default SearchTerm;
