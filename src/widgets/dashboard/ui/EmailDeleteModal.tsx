import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import notice from '../../../../public/assets/dashboard/mail/Notice.svg';

interface EmailDeleteMoalProps {
  onClose: () => void;
}

const EmailDeleteMoal = ({ onClose }: EmailDeleteMoalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full max-w-lg mx-auto backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center w-[90%] gap-5 py-6 bg-white border border-placeholderText rounded-lg p-6">
        <img src={notice} alt="경고 아이콘" className="w-20" />
        <span className="text-14 font-semibold text-center">
          이메일을 삭제하면 예약이 자동으로 취소됩니다.
          <br />
          그래도 삭제하시겠습니까?
        </span>
        <div className="flex justify-end gap-4">
          <TertiaryButton label="취소" type="button" color="black" size="medium" onClick={onClose} />
          <TertiaryButton label="삭제" type="button" color="pink" size="medium" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
export default EmailDeleteMoal;
