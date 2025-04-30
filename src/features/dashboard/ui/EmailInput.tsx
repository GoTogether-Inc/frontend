import { useEffect, useState } from 'react';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';
import EmailInputBase from '../../../shared/ui/EmailInputBase';
import { useEmailStore } from '../model/EmailStore';

interface EmailInputProps {
  type?: '이메일 예약 발송' | '선택 이메일 보내기' | '이메일 내용 수정';
  openSelectTicket: () => void;
  allParticipantEmails: string[];
  isEdited?: boolean;
}

const EmailInput = ({ type = '이메일 예약 발송', openSelectTicket, allParticipantEmails, isEdited }: EmailInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const {
    title,
    content,
    recipients,
    setTitle,
    setContent,
    setRecipients,
  } = useEmailStore();

  useEffect(() => {
    if (!isEdited) {
      setRecipients([]); 
      setTitle('');
    setContent('');
    }
  }, [isEdited, setRecipients]);
  
  const addAllEmails = () => {
    setRecipients([...new Set(allParticipantEmails)]);
  };
  const removeAllEmail = () => {
    setRecipients([]);
  };
  return (
    <div className="flex flex-col gap-4 mb-2">
      <div className="w-full text-center font-bold text-xl">{type}</div>

      {/* 수신자와 제목 입력하는 부분 */}
      <div className="text-xs flex flex-row gap-2 text-gray-700 w-full justify-end">
        <TextButton label="전체 이메일 보내기" onClick={addAllEmails} />|
        <TextButton label="티켓별 이메일 보내기" onClick={openSelectTicket} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <h1 className="text-base font-bold whitespace-nowrap">받는 사람</h1>
          {/* 이메일 입력 필드 */}
          <EmailInputBase
            emails={recipients}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onRemove={removeAllEmail}
            showAllEmails={false}
            placeholder={recipients.length === 0 ? '위 필터로 이메일 보내실 대상을 선택하세요.' : ''}
          />
        </div>
        <DefaultTextField className="h-12" leftText="제목" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      {/* 이메일 내용 작성 부분 */}
      <MultilineTextField
        label="발송될 이메일 내용"
        className="h-80 md:mb-4"
        placeholder="발송될 이메일 본문 내용입니다."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};
export default EmailInput;
