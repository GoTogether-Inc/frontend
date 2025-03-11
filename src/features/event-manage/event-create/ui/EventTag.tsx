import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FunnelState } from '../model/FunnelContext';
import MultilineTextField from '../../../../../design-system/ui/textFields/MultilineTextField';

interface EventTagProps {
  formState?: FunnelState['formState'];
  setFormState?: React.Dispatch<React.SetStateAction<FunnelState['formState']>>;
}

const EventTag = ({ formState, setFormState }: EventTagProps) => {
  const [inputValue, setInputValue] = useState('');
  const MAX_TAGS = 5;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const hashtags = formState?.hashtags || [];

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      if (hashtags.length >= MAX_TAGS) {
        return;
      }

      const newTag = inputValue.trim();
      if (!formState?.hashtags.includes(newTag)) {
        if (setFormState) {
          setFormState(prev => ({
            ...prev,
            hashtags: [...prev.hashtags, newTag],
          }));
        }
        setInputValue('');
      }
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    if (setFormState) {
      setFormState(prev => ({
        ...prev,
        hashtags: prev.hashtags.filter(tag => tag !== tagToRemove),
      }));
    }
  };

  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold text-black text-lg">이벤트 해시태그</h1>
      <p className="text-placeholderText text-base mb-2">최대 5개의 태그를 입력할 수 있어요</p>

      <div className="relative mb-4">
        <MultilineTextField
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="엔터를 이용해 태그를 입력하세요"
          className="w-full h-40"
          disabled={hashtags.length >= MAX_TAGS}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {formState?.hashtags.map((tag, index) => (
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
