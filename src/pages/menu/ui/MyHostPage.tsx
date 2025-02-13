import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import HostLogo from '../../../../public/assets/menu/HostLogo.svg';
import ProfileCircle from '../../../../design-system/ui/Profile';
import { trendingEvents } from '../../../shared/types/eventCardType';
import EventCard from '../../../shared/ui/EventCard';
import { useState } from 'react';
import { hostInfo } from '../../../shared/types/hostInfoType';

const MyHostPage = () => {
  const [selectedHostId, setSelectedHostId] = useState<number | null>(null);

  const handleProfileClick = (hostId: number) => {
    setSelectedHostId(hostId);
  };

  const filteredEvents = selectedHostId ? trendingEvents.filter(event => event.id === selectedHostId) : trendingEvents;

  return (
    <TicketHostLayout image={HostLogo} centerContent="내 호스트">
      <div className="flex space-x-5 mt-24 mx-5 overflow-x-auto scrollbar-hide">
        {hostInfo.map(profile => (
          <ProfileCircle
            key={profile.id}
            id={profile.id}
            name={profile.name}
            profile="hostProfile"
            onClick={() => handleProfileClick(profile.id)}
            className="md:w-20 md:h-20 w-16 h-16 hover:border hover:border-main"
          />
        ))}
      </div>

      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-5 mt-3 md:grid-cols-2 lg:grid-cols-2 pb-6">
        {filteredEvents.map((event, index) => (
          <EventCard
            key={index}
            img={event.img}
            eventTitle={event.eventTitle}
            dDay={event.dDay}
            host={event.host}
            eventDate={event.eventDate}
            location={event.location}
            hashtags={event.hashtags}
          />
        ))}
      </div>
    </TicketHostLayout>
  );
};
export default MyHostPage;
