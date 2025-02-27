import TextButton from '../../../design-system/ui/buttons/TextButton';

interface EmailInputBaseProps {
  emails: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onRemove: (index: number) => void; // 개별 또는 전체 삭제를 위한 함수
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showAllEmails?: boolean;
}

const EmailInputBase = ({
  emails,
  inputValue,
  setInputValue,
  onRemove,
  onKeyDown,
  placeholder = '이메일을 입력해주세요',
  showAllEmails = false,
}: EmailInputBaseProps) => {
  return (
    <div className="w-full p-2 border border-placeholderText rounded-[3px] min-h-[48px]">
      {emails.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {showAllEmails ? (
            emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-dropdown border border-main rounded-full"
              >
                <div className="flex items-center justify-center w-5 h-5 text-white bg-main rounded-full">
                  {email[0].toLocaleLowerCase()}
                </div>
                <span className="text-sm text-main">{email}</span>

                <TextButton label="X" onClick={() => onRemove(index)} className="text-xs font-light text-main" />
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-dropdown border border-main rounded-full">
              <div className="flex items-center justify-center w-5 h-5 text-white bg-main rounded-full">
                {emails[0][0].toLowerCase()}
              </div>
              <span className="text-sm text-main">
                {emails[0]} {emails.length > 1 && `외 ${emails.length - 1}명`}
              </span>
              <TextButton label="X" onClick={() => onRemove(0)} className="text-xs font-light text-main" />
            </div>
          )}
        </div>
      )}
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={emails.length === 0 ? placeholder : ''}
        className="w-full outline-none text-xs font-light"
      />
    </div>
  );
};
export default EmailInputBase;
