import TextButton from '../../../../design-system/ui/buttons/TextButton';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';

interface EmailInputProps {
  type?: '이메일 예약 발송' | '선택 이메일 보내기';
}

const EmailInput = ({ type = '이메일 예약 발송' }: EmailInputProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full text-center font-bold text-xl">{type}</div>

      {/* 수신자와 제목 입력하는 부분 */}
      <div className="text-xs flex flex-row gap-2 text-gray-700 w-full justify-end">
        <TextButton label="전체 이메일 보내기" onClick={() => console.log('전체 이메일 보내기')} />|
        <TextButton label="티켓별 이메일 보내기" onClick={() => console.log('전체 이메일 보내기')} />
      </div>
      <div className="flex flex-col gap-2">
        <DefaultTextField
          className="h-12"
          leftText="받는 사람"
          placeholder="개인별로 선택하거나, 위에 필터를 선택하세요."
        />
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
