import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import notice from '../../../../public/assets/dashboard/mail/Notice.svg';

interface EmailDeleteMoalProps {
  mainText: string;
  approveButtonText: string;
  rejectButtonText: string;
  onClose: () => void;
  onClick?: () => void;
}

const EmailDeleteMoal = ({ onClose, mainText, approveButtonText, rejectButtonText, onClick }: EmailDeleteMoalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full max-w-lg mx-auto backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center w-[93%] gap-5 py-6 bg-white border border-placeholderText rounded-lg p-6">
        <img src={notice} alt="경고 아이콘" className="w-20" />
        <div>
          {mainText.split('. ').map((text, i) => (
            <p className="text-12 md:text-14 font-semibold text-center" key={i}>
              {text}
            </p>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <TertiaryButton label={rejectButtonText} type="button" color="black" size="medium" onClick={onClose} />
          <TertiaryButton label={approveButtonText} type="button" color="pink" size="medium" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
export default EmailDeleteMoal;
