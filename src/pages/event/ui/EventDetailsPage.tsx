import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizerInfo from '../../../widgets/event/ui/OrganizerInfo';
import Header from '../../../../design-system/ui/Header';
import Search from '../../../../design-system/icons/Search.svg';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import share from '../../../../public/assets/event-manage/details/Share.svg';
import like from '../../../../public/assets/event-manage/details/Like.svg';
import liked from '../../../../public/assets/event-manage/details/ClickedLike.svg';
import TicketInfo from '../../../widgets/event/ui/TicketInfo';
import link from '../../../../public/assets/event-manage/details/Link.svg';
import ShareEventModal from '../../../features/event-manage/event-create/ui/ShareEventModal';
import { readEventDetail } from '../../../features/event-manage/event-create/api/event';
import participantsImg from '../../../../public/assets/event-manage/details/People.svg';
import dateImg from '../../../../public/assets/event-manage/details/Date.svg';
import timeImg from '../../../../public/assets/event-manage/details/Time.svg';
import locationImg from '../../../../public/assets/event-manage/details/Location.svg';
import KakaoMap from '../../../shared/ui/KakaoMap';

interface ReadEvent {
  id: number;
  bannerImageUrl: string;
  title: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  address: string;
  location: { lat: number; lng: number };
  description: string;
  hostChannelName: string;
  hostChannelDescription: string;
  organizerEmail: string;
  organizerPhoneNumber: string;
  referenceLinks: { title: string; url: string };
  category: string;
  onlineType: string;
  status: string;
  hashtags: string[];
}

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedLike, setClickedLike] = useState(false);

  const [event, setEvent] = useState<ReadEvent | null>(null);
  const eventId = 1; //수정 필요

  const handleShareClick = (title: string) => {
    setTitle(title);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLikeClick = () => {
    setClickedLike(prev => !prev);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await readEventDetail(eventId);
        setEvent(response.result);
      } catch (error) {
        console.error('이벤트 상세 정보 불러오기 실패:', error);
      }
    };
    fetchEventDetail();
  }, []);


  return (
    <>
      <Header
        leftButtonClassName="text-xl hover:no-underline z-30"
        leftButtonClick={() => navigate(-1)}
        leftButtonLabel="<"
        centerContent="같이가요"
        rightContent={<img src={Search} alt="검색" className="w-4" />}
      />
      {event ? (
        <>
          <img src={event.bannerImageUrl} alt="이벤트 배너" className="w-full h-64 mb-6" />
          <div className="flex flex-col gap-3 px-4 md:px-6">

            <div key={event.id} className="flex flex-col gap-2">
              <h1 className="text-xl md:text-2xl font-bold">{event.title}</h1>
              <div className="flex justify-between items-center gap-1">
                <div className="flex gap-2">
                  <img src={participantsImg} alt="인원수 이미지" />
                  <span className="font-bold text-base md:text-lg py-2">
                    현재 {event.participantCount}명이 참가 신청했습니다.
                  </span>
                </div>
                <div className="flex gap-3">
                  <IconButton
                    iconPath={<img src={share} alt="공유하기 버튼" />}
                    onClick={() => handleShareClick(event.title)}
                  />
                  <IconButton
                    iconPath={<img src={clickedLike ? liked : like} alt="좋아요 버튼" />}
                    onClick={handleLikeClick}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <img src={dateImg} alt="달력 이미지" />
                <span className="text-sm md:text-base">{event.startDate} ~ {event.endDate}</span>
              </div>
              <div className="flex gap-2">
                <img src={timeImg} alt="시간 이미지" />
                <span className="text-sm md:text-base">{event.startTime} ~ {event.endTime}</span>
              </div>
              <div className="flex gap-2">
                <img src={locationImg} alt="위치 이미지" />
                <span className="text-sm md:text-base">{event.address}</span>
              </div>
              <span className="text-sm md:text-base py-3">{event.description}</span>
            </div>


            <h2 className="font-bold text-xl">위치</h2>
            <KakaoMap lat={event.location.lat} lng={event.location.lng} />

            <OrganizerInfo
              name={event.hostChannelName}
              description={event.hostChannelDescription}
              phone={event.organizerPhoneNumber}
              email={event.organizerEmail}
            />

            <h2 className="font-bold text-xl">티켓 옵션</h2>
            <TicketInfo eventId={event.id} />

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-xl">관련 링크</h2>
              <div className="flex items-center gap-3 mb-4">
                <img src={link} alt="링크 이모지" />
                <span>공식 웹사이트</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">로딩 중...</div>
      )}
      {isModalOpen && <ShareEventModal closeModal={closeModal} eventName={title} />}
    </>
  );
};
export default EventDetailsPage;
