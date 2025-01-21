import MultilineTextField from '../../../design-system/ui/textFields/MultilineTextField';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

const TagInput = ({ value, onChange, maxTags = Infinity, placeholder }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      if (value.length >= maxTags) {
        return;
      }

      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col justify-start">
      <MultilineTextField
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-40"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag, index) => (
          <div key={index} className="inline-flex items-center border border-main bg-dropdown px-3 py-1 rounded-[1px]">
            <span className="text-main mr-2">{tag}</span>
            <button onClick={() => removeTag(tag)} className="text-main focus:outline-none">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TagInput;
