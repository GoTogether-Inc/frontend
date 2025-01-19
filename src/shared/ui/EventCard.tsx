import React from 'react';
import Countdown from '../../../design-system/ui/texts/Countdown';

interface EventCardProps {
  img: string;
  eventTitle: string;
  dDay: string;
  host: string;
  eventDate: string;
  location: string;
  hashtags: string[];
  onClick?: () => void;
}

const EventCard = ({ img, eventTitle, dDay, host, eventDate, location, hashtags, onClick }: EventCardProps) => {
  return (
    <div onClick={onClick} className="w-full max-w-sm p-4 overflow-hidden bg-white rounded-lg shadow-md cursor-pointer">
      {/* 이미지 */}
      <img src={img} alt={eventTitle} className="object-cover w-full rounded-md sm:h-20 md:h-24 lg:h-28" />

      {/* 상세 정보 */}
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex justify-between">
          <h2 className="text-sm font-medium truncate">{eventTitle}</h2>
          <Countdown isChecked>{dDay}</Countdown>
        </div>

        <p className="text-xs text-gray-500">{host}</p>
        <p className="text-xs text-gray-500">{eventDate}</p>
        <p className="text-xs text-gray-500">{location}</p>
        {/* 해시태그 */}
        <div className="flex flex-wrap w-full h-6 mt-2 overflow-hidden text-xs font-semibold text-gray-700 whitespace-nowrap">
          {hashtags.map((tag, index) => (
            <span key={index} className="flex items-center justify-center h-6 px-2 mr-2 bg-gray-200 rounded last:mr-0">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
