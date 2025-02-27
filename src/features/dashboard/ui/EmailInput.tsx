import { useState } from 'react';
import TextButton from '../../../../design-system/ui/buttons/TextButton';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';

interface EmailInputProps {
  type?: '이메일 예약 발송' | '선택 이메일 보내기';
  openSelectTicket: () => void;
  allParticipantEmails: string[];
}

const EmailInput = ({ type = '이메일 예약 발송', openSelectTicket, allParticipantEmails }: EmailInputProps) => {
  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addAllEmails = () => {
    setAllEmails([...new Set(allParticipantEmails)]);
  };
  const removeAllEmail = () => {
    setAllEmails([]);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full text-center font-bold text-xl">{type}</div>

      {/* 수신자와 제목 입력하는 부분 */}
      <div className="text-xs flex flex-row gap-2 text-gray-700 w-full justify-end">
        <TextButton label="전체 이메일 보내기" onClick={addAllEmails} />|
        <TextButton label="티켓별 이메일 보내기" onClick={openSelectTicket} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold whitespace-nowrap">받는 사람</h1>
          {/* 이메일 입력 필드 */}
          <div className="flex w-full items-center gap-2 p-2 border border-placeholderText rounded-[3px] min-h-[48px]">
            {allEmails.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-dropdown border border-main rounded-full">
                <div className="flex items-center justify-center w-5 h-5 text-white bg-main rounded-full">
                  {allEmails[0][0].toLowerCase()}
                </div>
                <span className="text-sm text-main">
                  {allEmails[0]} {allEmails.length > 1 && `외 ${allEmails.length - 1}명`}
                </span>
                <TextButton label="X" onClick={removeAllEmail} className="text-xs font-light text-main" />
              </div>
            )}
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={allEmails.length === 0 ? '개인별로 입력하거나, 위에 필터를 선택하세요.' : ''}
              className="flex-1 outline-none text-xs font-light"
            />
          </div>
        </div>
        <DefaultTextField className="h-12" leftText="제목" placeholder="제목" />
      </div>
      {/* 이메일 내용 작성 부분 */}
      <MultilineTextField
        label="추가 발송될 이메일 내용"
        className="h-80 mb-4"
        placeholder="추가 발송될 이메일 본문 내용입니다."
      />
    </div>
  );
};
export default EmailInput;
