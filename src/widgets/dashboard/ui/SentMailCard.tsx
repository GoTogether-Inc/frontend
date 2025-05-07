import arrow from '../../../../public/assets/dashboard/mail/Arrow.svg';
import { useState } from 'react';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import { formatDate } from '../../../shared/lib/date';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadEmailResponse } from '../../../features/dashboard/model/emailInformation';
import { useEmailStore } from '../../../features/dashboard/model/EmailStore';

interface SentMailCardProps {
  mail: ReadEmailResponse;
  isPending: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClickDelete?: () => void;
}

const SentMailCard = ({ mail, isPending = false, onClickDelete }: SentMailCardProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { setReservationEmailId, setTitle, setContent, setRecipients, setReservationDate } = useEmailStore();
  const handleEditClick = () => {
    setReservationEmailId(mail.id);
    setTitle(mail.title);
    setContent(mail.content);
    setRecipients(mail.recipients);
    setReservationDate(mail.reservationDate);

    navigate(`/dashboard/${id}/edit-email`);
  };

  return (
    <div className="p-4 bg-white rounded-[5px] border-[0.5px] border-gray4 transition-all">
      <div className="flex justify-between transition-transform">
        <div className="flex flex-col gap-1 text-md">
          <div className="flex items-center gap-2">
            {/* <p className="text-main font-semibold">[{mail.receiver}]</p>  수정 필요 */}
            <p className="text-main font-semibold">[무료]</p>
            <p>{mail.title}</p>
          </div>
          <p className="text-sm text-placeholderText">{formatDate(mail.reservationDate)}</p>
        </div>
        <IconButton
          iconPath={<img src={arrow} alt="화살표" className={`${isOpen ? 'rotate-180' : ''}`} />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="flex flex-col">
          <p className="mt-4 text-14 whitespace-pre-line">{mail.content}</p>
          {isPending && (
            <div className="flex justify-end gap-3">
              <TertiaryButton
                label="삭제하기"
                type="button"
                color="black"
                size="medium"
                onClick={onClickDelete}
              />
              <TertiaryButton
                label="수정하기"
                type="button"
                color="pink"
                size="medium"
                onClick={handleEditClick}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SentMailCard;
