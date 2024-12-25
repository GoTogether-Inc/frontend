import OnlineIcon from '../../../../public/assets/OnlineIcon.svg';
import OfflineIcon from '../../../../public/assets/OfflineIcon.svg';
import SearchBar from '../../../shared/ui/SearchBar';
import { useFunnelStore } from '../../../features/event-manage/model/funnelStore';

interface EventTypeProps {
  className?: string;
}

const EventType: React.FC<EventTypeProps> = ({ className }) => {
  const { data, updateFunnelData } = useFunnelStore();

  const handleTypeClick = (type: 'online' | 'offline') => {
    updateFunnelData({ onlineType: type });
  };

  return (
    <div className={`flex flex-col justify-center w-full ${className}`}>
      <div className="flex flex-col justify-start">
        <h1 className="font-bold text-black text-lg mb-4">이벤트가 온라인 인가요, 오프라인 인가요?</h1>
        <div className="flex justify-between gap-2 md:px-1">
          <div
            onClick={() => handleTypeClick('online')}
            className={`flex flex-col justify-center items-center w-40 h-40 md:w-44 md:h-44 border rounded-[20px] cursor-pointer ${
              data.onlineType === 'online' ? 'border-main' : 'border-placeholderText'
            }`}
          >
            <img src={OnlineIcon} alt="온라인 이모지" className="w-28 h-28 md:w-32 md:h-32" />
            <span className="text-base font-semibold">온라인 이벤트</span>
          </div>

          <div
            onClick={() => handleTypeClick('offline')}
            className={`flex flex-col justify-center items-center w-40 h-40 md:w-44 md:h-44 border rounded-[20px] cursor-pointer ${
              data.onlineType === 'offline' ? 'border-main' : 'border-placeholderText'
            }`}
          >
            <img src={OfflineIcon} alt="오프라인 이모지" className="w-28 h-28 md:w-32 md:h-32" />
            <span className="text-base font-semibold">오프라인 이벤트</span>
          </div>
        </div>
      </div>

      {data.onlineType === 'offline' && (
        <div className="mt-6 space-y-2">
          <h1 className="font-bold text-black text-lg">이벤트는 어디서 진행되나요?</h1>
          <SearchBar placeholder="장소를 입력하세요." className="w-full" />
        </div>
      )}
    </div>
  );
};
export default EventType;
