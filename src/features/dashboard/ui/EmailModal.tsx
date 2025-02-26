import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import EmailInput from './EmailInput';

interface EmailModalProps {
  onClose: () => void;
  openSelectTicket: () => void;
}
const EmailModal = ({ onClose, openSelectTicket }: EmailModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-30 z-30">
      <div className="flex flex-col w-[95%] px-4 py-4 gap-7 rounded-[5px] bg-white">
        <EmailInput type="선택 이메일 보내기" openSelectTicket={openSelectTicket} />
        <div className="flex justify-end gap-3">
          <TertiaryButton label="취소" type="button" color="black" size="medium" onClick={onClose} />
          <TertiaryButton label="전송" type="button" color="pink" size="medium" />
        </div>
      </div>
    </div>
  );
};
export default EmailModal;
