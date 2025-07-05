import { Dispatch, SetStateAction } from 'react';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import MemberEmailInput from '../../../features/menu/ui/MemberEmailInput';

const MemberInvite = ({
  emails,
  setEmails,
  handleInviteMembers,
}: {
  emails: string[];
  setEmails: Dispatch<SetStateAction<string[]>>;
  handleInviteMembers: () => void;
}) => {
  return (
    <div className="flex flex-col gap-2 px-8 md:px-6 mb-4">
      <div className="flex flex-col">
        <h1 className="font-bold text-black text-lg">멤버 등록</h1>
        <p className="text-placeholderText text-10 md:text-13">
          추가할 회원의 이메일을 입력한 뒤, 엔터를 눌러 검색해 주세요.
          <br />
          삭제하려면 추가된 이메일 아이콘의 x를 눌러주세요.
        </p>
      </div>
      <MemberEmailInput emails={emails} setEmails={setEmails} />
      <TertiaryButton type="button" label="전송" size="large" color="pink" onClick={handleInviteMembers} />
    </div>
  );
};

export default MemberInvite;
