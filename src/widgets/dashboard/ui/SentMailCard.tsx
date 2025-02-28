import { mailInfoData } from '../../../shared/types/mailInfoType';
import arrow from '../../../../public/assets/dashboard/mail/Arrow.svg';
import { useState } from 'react';
import IconButton from '../../../../design-system/ui/buttons/IconButton';

interface SentMailCardProps {
  mail: mailInfoData;
}

const SentMailCard = ({ mail }: SentMailCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-white rounded-[5px] border-[0.5px] border-gray4 transition-all">
      <div className="flex justify-between transition-transform">
        <div className="flex flex-col gap-1 text-md">
          <div className="flex items-center gap-2">
            <p className="text-main font-semibold">[{mail.receiver}]</p>
            <p>{mail.title}</p>
          </div>
          <p className="text-sm text-placeholderText">{mail.date}</p>
        </div>
        <IconButton
          iconPath={<img src={arrow} alt="화살표" className={`${isOpen ? 'rotate-180' : ''}`} />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && <p className="mt-4 text-14 whitespace-pre-line">{mail.content}</p>}
    </div>
  );
};
export default SentMailCard;
