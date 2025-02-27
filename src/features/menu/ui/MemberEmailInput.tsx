import { useState, KeyboardEvent } from 'react';
import EmailInputBase from '../../../shared/ui/EmailInputBase';

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
    <EmailInputBase
      emails={emails}
      inputValue={inputValue}
      setInputValue={setInputValue}
      onRemove={removeEmail}
      onKeyDown={handleKeyDown}
      showAllEmails={true}
    />
  );
};
export default MemberEmailInput;
