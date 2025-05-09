import { useState } from 'react';
import CategoryButton from '../../../../../public/assets/event-manage/creation/BackBtn(black).svg';
import { FunnelState } from '../model/FunnelContext';
import { CategoryType } from '../../../../shared/types/baseEventType';

interface Category {
  id: string;
  name: string;
}

interface EventCategoryProps {
  eventState?: FunnelState['eventState'];
  setEventState?: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
}

const EventCategory = ({ eventState, setEventState }: EventCategoryProps) => {
  const [open, setOpen] = useState(false);

  const categories: Category[] = [
    { id: 'DEVELOPMENT_STUDY', name: '개발/스터디' },
    { id: 'NETWORKING', name: '네트워킹' },
    { id: 'HACKATHON', name: '해커톤' },
    { id: 'CONFERENCE', name: '컨퍼런스' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    eventState?.category
      ? { id: eventState.category, name: categories.find(c => c.id === eventState.category)?.name || '' }
      : null
  );

  const handleSelect = (category: Category) => {
    setSelectedCategory(category);
    setOpen(false);
    if (setEventState) {
      setEventState(prev => ({ ...prev, category: category.id as CategoryType }));
    }
  };

  const handleDropdown = () => setOpen(!open);

  return (
    <div className="flex flex-col justify-start relative">
      <h1 className="font-bold text-black text-lg">이벤트 카테고리</h1>
      <p className="text-placeholderText text-base mb-2">1개의 카테고리를 선택해주세요</p>

      <div className="relative">
        <button
          onClick={handleDropdown}
          className="flex justify-between p-2 text-left bg-white border border-placeholderText rounded-[2px] focus:outline-none w-full max-w-52"
        >
          <span>{selectedCategory ? selectedCategory.name : '이벤트 카테고리 선택'}</span>
          <img src={CategoryButton} alt="카테고리 버튼" className="w-6 h-6 -rotate-90" />
        </button>
        {open && (
          <div className="absolute top-full left-0 bg-white border border-placeholderText rounded-[2px] z-50 w-full max-w-52">
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => handleSelect(category)}
                className={`p-2 cursor-pointer hover:bg-dropdown transition-colors ${
                  eventState?.category === category.id ? 'bg-dropdown' : ''
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
