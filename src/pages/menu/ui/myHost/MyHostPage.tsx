import TicketHostLayout from '../../../../shared/ui/backgrounds/TicketHostLayout';
import HostLogo from '../../../../../public/assets/menu/HostLogo.svg';
import ProfileCircle from '../../../../../design-system/ui/Profile';
import EventCard from '../../../../shared/ui/EventCard';
import { useState } from 'react';
import useHostChannelList from '../../../../entities/host/hook/useHostChannelListHook';
import useHostDetail from '../../../../entities/host/hook/useHostDetailHook';
import TertiaryButton from '../../../../../design-system/ui/buttons/TertiaryButton';
import useAuthStore from '../../../../app/provider/authStore';
import FloatingButton from '../../../../shared/ui/FloatingButton';
import manualIcon from '../../../../../public/assets/menu/help.svg';

const MyHostPage = () => {
  const [selectedHostId, setSelectedHostId] = useState<number | null>(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [deletedEventId, setDeletedEventId] = useState<number[]>([]);

  const { data } = useHostChannelList();
  const { data: hostDetail } = useHostDetail(selectedHostId ?? 0);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const handleProfileClick = (hostId: number) => {
    setSelectedHostId(hostId);
  };

  return (
    <TicketHostLayout image={HostLogo} centerContent="내 호스트" ticketPage={false}>
      <div className="flex space-x-5 mt-28 mx-5 overflow-x-auto scrollbar-hide">
        {!isLoggedIn ? (
          <p className="text-center mx-auto text-sm md:text-base text-red-500">로그인이 필요한 서비스입니다.</p>
        ) : data?.result.length ? (
          data.result.map(profile => (
            <ProfileCircle
              key={profile.id}
              id={profile.id}
              name={profile.hostChannelName}
              profileImageUrl={profile.profileImageUrl}
              profile="hostProfile"
              onClick={() => handleProfileClick(profile.id)}
              className="md:w-20 md:h-20 w-16 h-16 hover:border hover:border-main"
            />
          ))
        ) : (
          <p className="col-span-2 text-center text-sm md:text-base mx-auto">호스트 정보가 없습니다.</p>
        )}
      </div>

      {hostDetail?.result?.events && hostDetail?.result?.events?.length > 0 && (
        <div className="flex justify-end mx-6">
          <TertiaryButton
            label={deleteBtn ? '완료' : '삭제'}
            type="button"
            color="pink"
            size="small"
            onClick={() => setDeleteBtn(prev => !prev)}
          />
        </div>
      )}

      {/* 이벤트 카드 목록 */}
      <div className="grid grid-cols-2 gap-4 mx-5 md:grid-cols-2 lg:grid-cols-2 pb-6">
        {hostDetail?.result?.events
          ?.filter(event => !deletedEventId.includes(event.id))
          .map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              img={event.bannerImageUrl}
              eventTitle={event.title}
              dDay={event.remainDays}
              host={event.hostChannelName}
              eventDate={event.startDate}
              location={event.onlineType}
              hashtags={event.hashtags}
              isDelete={deleteBtn}
              onDeleteSuccess={(deletedEventId: number) => {
                setDeletedEventId(prev => [...prev, deletedEventId]);
              }}
              aspectRatio='md:aspect-[3/4.7] sm:aspect-[1/1.8]'
            />
          ))}
      </div>
      <div className="sticky bottom-6 w-full flex justify-end px-6 z-50">
        <FloatingButton ariaLabel="사용법" onClick={() => window.open('https://namu00.notion.site/209eaffb9b0e80caa0dae68c1e12ed0f', '_blank')} className='bottom-6'>
          <img src={manualIcon} alt="사용법" className="w-full h-full" />
        </FloatingButton>
      </div>
    </TicketHostLayout>
  );
};
export default MyHostPage;
