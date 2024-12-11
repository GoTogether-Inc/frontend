import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface EventTagProps {
  className: string;
}

const EventTag: React.FC<EventTagProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const MAX_TAGS = 5;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      if (hashtags.length >= MAX_TAGS) {
        return;
      }

      const newTag = inputValue.trim();
      if (!hashtags.includes(newTag)) {
        setHashtags(prevTags => {
          if (prevTags[prevTags.length - 1] !== newTag) {
            return [...prevTags, newTag];
          }
          return prevTags;
        });
        setInputValue('');
      }
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold text-black text-lg">이벤트 해시태그</h1>
      <p className="text-placeholderText text-base mb-2">최대 5개의 태그를 입력할 수 있어요</p>

      <div className="relative mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="엔터를 이용해 태그를 입력하세요"
          className={`p-2 border text-left border-deDayTextDark rounded-[2px] focus:outline-none ${className}`}
          disabled={hashtags.length >= MAX_TAGS}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <div key={index} className="inline-flex items-center border border-main bg-dropdown px-3 py-1 rounded-[1px]">
            <span className="text-main mr-2">{tag}</span>
            <button onClick={() => removeHashtag(tag)} className="text-main focus:outline-none">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EventTag;
