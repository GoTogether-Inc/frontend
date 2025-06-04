import React from 'react';
import Checkbox from '../../../design-system/ui/Checkbox';

interface AgreementCardProps {
  title: string;
  required: boolean;
  checked: boolean;
  onChange: () => void;
  link?: string;
}

const AgreementCard: React.FC<AgreementCardProps> = ({ title, required, checked, onChange, link }) => (
  <div className="flex items-center justify-between text-xs border-gray-300 rounded-lg min-h-6 sm:text-xs md:text-xs lg:text-sm min-w-28">
    <div className="flex ">
      <Checkbox checked={checked} onChange={onChange} label="" />
      <div className="flex items-center mr-2 min-h-6">
        {required ? '[필수] ' : '[선택] '}
        {title}
      </div>
    </div>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 text-lg"
      >
        &gt;
      </a>
    )}
  </div>
);

export default AgreementCard;
