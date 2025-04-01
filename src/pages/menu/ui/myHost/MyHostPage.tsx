import TicketHostLayout from '../../../../shared/ui/backgrounds/TicketHostLayout';
import HostLogo from '../../../../../public/assets/menu/HostLogo.svg';
import ProfileCircle from '../../../../../design-system/ui/Profile';
import EventCard from '../../../../shared/ui/EventCard';
import { useState } from 'react';
import useHostChannelList from '../../../../entities/host/hook/useHostChannelListHook';
import useHostDetail from '../../../../entities/host/hook/useHostDetailHook';

const MyHostPage = () => {
  const [selectedHostId, setSelectedHostId] = useState<number | null>(null);
  const { data } = useHostChannelList();
  const { data: hostDetail } = useHostDetail(selectedHostId ?? 0);

  const handleProfileClick = (hostId: number) => {
    setSelectedHostId(hostId);
  };

  return (
    <TicketHostLayout image={HostLogo} centerContent="내 호스트">
      <div className="flex space-x-5 mt-24 mx-5 overflow-x-auto scrollbar-hide">
        {data?.result.map(profile => (
          <ProfileCircle
            key={profile.id}
            id={profile.id}
            name={profile.hostChannelName}
            profile="hostProfile"
            onClick={() => handleProfileClick(profile.id)}
            className="md:w-20 md:h-20 w-16 h-16 hover:border hover:border-main"
          />
        ))}
      </div>

      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-5 mt-3 md:grid-cols-2 lg:grid-cols-2 pb-6">
        {hostDetail?.result?.events?.map(event => (
          <EventCard
            key={event.id}
            img={event.bannerImageUrl}
            eventTitle={event.title}
            // dDay={event.dDay}
            host={event.hostChannelName}
            eventDate={event.startDate}
            location={event.address}
            hashtags={event.hashtags}
          />
        ))}
      </div>
    </TicketHostLayout>
  );
};
export default MyHostPage;
