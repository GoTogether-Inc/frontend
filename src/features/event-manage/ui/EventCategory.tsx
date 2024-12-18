import React, { useState } from 'react';
import CategoryButton from '../../../../public/assets/BackBtn(black).svg';

interface Category {
  id: string;
  name: string;
}

interface EventCategoryProps {
  className: string;
}

const EventCategory: React.FC<EventCategoryProps> = ({ className }) => {
  const [selectedCategory, setSelectedCateory] = useState<string>('');
  const [open, setOpen] = useState(false);

  const categories: Category[] = [
    { id: 'study', name: '개발/스터디' },
    { id: 'networking', name: '네트워킹' },
    { id: 'hackathon', name: '해커톤' },
    { id: 'conference', name: '컨퍼런스' },
  ];

  const handleDropdown = () => setOpen(!open);

  const handleSelect = (id: string) => {
    setSelectedCateory(id);
    setOpen(false);
  };

  return (
    <div className="flex flex-col justify-start relative">
      <h1 className="font-bold text-black text-lg">이벤트 카테고리</h1>
      <p className="text-placeholderText text-base mb-2">1개의 카테고리를 선택해주세요</p>

      <div className="relative">
        <button
          onClick={handleDropdown}
          className={`flex justify-between p-2 text-left bg-white border border-deDayTextDark rounded-[2px] focus:outline-none ${className}`}
        >
          <span>
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : '이벤트 카테고리 선택'}
          </span>
          <img src={CategoryButton} alt="카테고리 버튼" className="w-6 h-6 -rotate-90" />
        </button>
        {open && (
          <div
            className={`absolute top-full left-0 bg-white border border-deDayTextDark rounded-[2px] z-50 ${className}`}
          >
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => handleSelect(category.id)}
                className={`p-2 cursor-pointer hover:bg-dropdown transition-colors ${
                  selectedCategory === category.id ? 'bg-dropdown' : ''
                }`}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default EventCategory;
