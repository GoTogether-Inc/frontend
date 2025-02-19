import { useNavigate } from 'react-router-dom';
import Header from '../../../../design-system/ui/Header';
import Search from '../../../../design-system/icons/Search.svg';
import banner from '../../../../public/assets/banners/1.png';
import { eventData } from '../../../shared/types/eventDetailType';
import share from '../../../../public/assets/event-manage/details/Share.svg';
import like from '../../../../public/assets/event-manage/details/Like.svg';
import OrganizerInfo from '../../../widgets/event/ui/OrganizerInfo';
import TicketInfo from '../../../widgets/event/ui/TicketInfo';
import link from '../../../../public/assets/event-manage/details/Link.svg';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import { useState } from 'react';
import ShareEventModal from '../../../features/event-manage/ui/ShareEventModal';

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handlePreviousButton = () => {
    navigate(-1);
  };
  const handleShareClick = (title: string) => {
    setTitle(title);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Header
        leftButtonClassName="text-xl hover:no-underline z-30"
        leftButtonClick={handlePreviousButton}
        leftButtonLabel="<"
        centerContent="같이가요"
        rightContent={<img src={Search} alt="검색" className="w-4" />}
      />
      <>
        <img src={banner} alt="이벤트 배너" className="w-full h-64 mb-6" />
        <div className="flex flex-col gap-3 px-4 md:px-6">
          {eventData.map(event => (
            <div key={event.id} className="flex flex-col gap-2">
              <h1 className="text-xl md:text-2xl font-bold">{event.title}</h1>
              <div className="flex justify-between items-center gap-1">
                <div className="flex gap-2">
                  <img src={event.participantsImg} alt="인원수 이미지" />
                  <span className="font-bold text-base md:text-lg py-2">
                    현재 {event.participants}명이 참가 신청했습니다.
                  </span>
                </div>
                <div className="flex gap-3">
                  <IconButton
                    iconPath={<img src={share} alt="공유하기 버튼" />}
                    onClick={() => handleShareClick(event.title)}
                  />
                  <img src={like} alt="좋아하기 버튼" />
                </div>
              </div>
              <div className="flex gap-2">
                <img src={event.dateImg} alt="달력 이미지" />
                <span className="text-sm md:text-base">{event.date}</span>
              </div>
              <div className="flex gap-2">
                <img src={event.timeImg} alt="시간 이미지" />
                <span className="text-sm md:text-base">{event.time}</span>
              </div>
              <div className="flex gap-2">
                <img src={event.locationImg} alt="위치 이미지" />
                <span className="text-sm md:text-base">{event.location}</span>
              </div>
              <span className="text-sm md:text-base py-3">{event.detail}</span>
            </div>
          ))}

          <h2 className="font-bold text-xl">위치</h2>
          <div className="w-full h-48 bg-gray2" />

          <OrganizerInfo />

          <h2 className="font-bold text-xl">티켓 옵션</h2>
          <TicketInfo />

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">관련 링크</h2>
            <div className="flex items-center gap-3 mb-4">
              <img src={link} alt="링크 이모지" />
              <span>공식 웹사이트</span>
            </div>
          </div>
        </div>
      </>
      {isModalOpen && <ShareEventModal closeModal={closeModal} eventName={title} />}
    </>
  );
};
export default EventDetailsPage;
