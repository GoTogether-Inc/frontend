import { useLocation, useNavigate } from 'react-router-dom';
import TertiaryButton from '../../../design-system/ui/buttons/TertiaryButton';
import Countdown from '../../../design-system/ui/texts/Countdown';
import dateImg from '../../../public/assets/event-manage/details/Date.svg';
import locationImg from '../../../public/assets/event-manage/details/Location.svg';
import { formatDate } from '../lib/date';
import IconButton from '../../../design-system/ui/buttons/IconButton';
import deleteButton from '../../../public/assets/menu/Delete.svg';
import { useState } from 'react';
import DeleteConfirmModal from '../../widgets/host/DeleteConfirmModal';
import { useEventDeletion } from '../../entities/event/hook/useEventHook';
import HashtagCarousel from './HashtagCarousel';

interface EventCardProps {
  id: number;
  img: string;
  eventTitle: string;
  dDay?: string;
  host: string;
  eventDate: string;
  location: string;
  hashtags: string[];
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  isDelete?: boolean;
  onDeleteSuccess?: (eventId: number) => void;
  onlineType?: 'OFFLINE' | 'ONLINE';
  status?: 'PROGRESS' | 'COMPLETE' | 'DELETED';
  aspectRatio?: string;
}

const EventCard = ({
  id,
  img,
  eventTitle,
  dDay,
  host,
  eventDate,
  location,
  hashtags,
  onClick,
  className,
  children,
  isDelete = false,
  onDeleteSuccess,
  onlineType,
  status,
  aspectRatio = 'md:aspect-[3/4.3] sm:aspect-[3/5]'
}: EventCardProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useEventDeletion();

  const isHostPage = pathname.startsWith(`/menu/myHost`) || pathname.startsWith(`/menu/hostDetail`);

  return (
    <div className={`${aspectRatio} w-full`}>
      <div
        onClick={onClick}
        className={`w-full h-full p-4 bg-white rounded-lg shadow-md flex flex-col justify-between ${className}`}
      >
        {/* 이미지 */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
          <img src={img} alt={eventTitle} className="w-full h-full object-cover" />
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col gap-1 mt-2 overflow-hidden">
          <div className="flex justify-between">
            <h2 className="md:max-w-[130px] sm:max-w-[130px] text-sm font-semibold truncate overflow-hidden">{eventTitle}</h2>
            {dDay !== 'false' && (
              <div className="sm:max-w-15 md:max-w-15">
                <Countdown isChecked status={status}>{dDay}</Countdown>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500">{host}</p>

          <div className="flex items-center text-xs text-gray-500">
            <img src={dateImg} alt="날짜" className="w-3 h-3 mr-1" />
            {formatDate(eventDate)}
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <img src={locationImg} alt="위치" className="w-3 h-3 mr-1" />
            <div className="w-full truncate overflow-hidden">
              {onlineType === 'ONLINE' ? 'ONLINE' : location}
            </div>
          </div>

          {/* 승인 여부 표시 */}
          {children}
          {/* 해시태그 */}
          {hashtags && (
            <HashtagCarousel hashtagSlides={hashtags} onClick={e => e.stopPropagation()} />
          )}

          {/* 대시보드 버튼 */}
          {isHostPage && (
            <div className="flex justify-between items-center h-7">
              <TertiaryButton
                label="호스트 대시보드 바로가기"
                type="button"
                color="pink"
                size="small"
                onClick={event => {
                  event?.stopPropagation();
                  navigate(`/dashboard/${id}`);
                }}
                className="w-31.5 md:w-33"
              />
              {isDelete && (
                <IconButton
                  iconPath={<img src={deleteButton} />}
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  iconClassName="w-5 h-5 md:w-7 md:h-7 bg-red-500 hover:bg-red-600 rounded-[5px] p-1"
                />
              )}

              <DeleteConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                  mutate(id, {
                    onSuccess: () => {
                      onDeleteSuccess?.(id);
                      setIsModalOpen(false);
                    },
                    onError: () => {
                      alert('이벤트 삭제에 실패했습니다.');
                      setIsModalOpen(false);
                    },
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
