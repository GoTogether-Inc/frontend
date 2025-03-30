import { useLocation, useNavigate } from 'react-router-dom';
import TertiaryButton from '../../../design-system/ui/buttons/TertiaryButton';
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
  children?: React.ReactNode;
}

const EventCard = ({ img, eventTitle, dDay, host, eventDate, location, hashtags, onClick, children }: EventCardProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHostPage = pathname.startsWith(`/menu/myHost`) || pathname.startsWith(`/menu/hostDetail`);

  return (
    <div onClick={onClick} className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md cursor-pointer">
      {/* 이미지 */}
      <img src={img} alt={eventTitle} className="object-cover w-full rounded-md sm:h-20 md:h-24 lg:h-28" />

      {/* 상세 정보 */}
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold truncate max-w-36">{eventTitle}</h2>
          <Countdown isChecked>{dDay}</Countdown>
        </div>

        <p className="text-xs text-gray-500">{host}</p>
        <p className="text-xs text-gray-500">{eventDate}</p>
        <p className="text-xs text-gray-500">{location}</p>
        {/* 승인 여부 표시 */}
        {children}
        {/* 해시태그 */}
        <div className="flex flex-wrap w-full h-6 mt-2 overflow-hidden text-xs font-semibold text-gray-700 whitespace-nowrap">
          {hashtags.map((tag, index) => (
            <span key={index} className="flex items-center justify-center h-6 px-2 mr-2 bg-gray-200 rounded last:mr-0">
              {tag}
            </span>
          ))}
        </div>

        {/* 대시보드 버튼 */}
        {isHostPage && (
          <TertiaryButton
            label="호스트 대시보드 바로가기"
            type="button"
            color="pink"
            size="small"
            onClick={event => {
              event?.stopPropagation();
              navigate('/dashboard');
            }}
            className="w-31.5 md:w-33 mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default EventCard;
