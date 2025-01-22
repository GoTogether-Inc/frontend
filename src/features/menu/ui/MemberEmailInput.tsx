import { useState, KeyboardEvent } from 'react';
import TextButton from '../../../../design-system/ui/buttons/TextButton';

const MemberEmailInput = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (inputValue.includes('@')) {
        setEmails([...emails, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeEmail = (indexToRemove: number) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-placeholderText rounded-[3px] min-h-[48px]">
      {emails.map((email, index) => (
        <div key={index} className="flex items-center gap-2 px-2 py-1 bg-dropdown border border-main rounded-full">
          <div className="flex items-center justify-center w-5 h-5 text-white bg-main rounded-full">
            {email[0].toLocaleLowerCase()}
          </div>
          <span className="text-sm text-main">{email}</span>

          <TextButton label="X" onClick={() => removeEmail(index)} className="text-xs font-light text-main" />
        </div>
      ))}
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="이메일을 입력해주세요"
        className="flex-1 outline-none text-xs font-light"
      />
    </div>
  );
};
export default MemberEmailInput;
