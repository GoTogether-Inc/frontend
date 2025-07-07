import link from '../../../../public/assets/event-manage/details/Link.svg';
import kakao from '../../../../public/assets/event-manage/details/KaKao.svg';
import { shareToKakao } from '../../../shared/lib/kakaoShare';
import stripHtml from '../lib/stripHtml';
import EventInfo from '../../../entities/user/ui/EventInfo';
import { useRef } from 'react';

interface ShareEventModalProps {
  closeModal: () => void;
  title: string;
  eventDescription?: string;
  eventImageUrl?: string;
  eventUrl?: string;
}

const ShareEventModal = ({
  closeModal,
  title,
  eventDescription = '',
  eventImageUrl = '',
  eventUrl = window.location.href,
}: ShareEventModalProps) => {
  const description = stripHtml(eventDescription);
  const startYRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const startY = startYRef.current;
    if (startY === null) return;

    const deltaY = e.touches[0].clientY - startY;

    // 모달이 따라 내려오는 효과 (optional)
    if (modalRef.current && deltaY > 0) {
      modalRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startY = startYRef.current;
    if (startY === null) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;

    if (deltaY > 100) {
      // 일정 거리 이상 내려갔을 때 모달 닫기
      closeModal();
    } else {
      // 다시 원위치
      if (modalRef.current) {
        modalRef.current.style.transform = 'translateY(0)';
        modalRef.current.style.transition = 'transform 0.2s ease-out';
        setTimeout(() => {
          if (modalRef.current) modalRef.current.style.transition = '';
        }, 200);
      }
    }
    startYRef.current = null;
  };

  const handleKakaoShare = async () => {
    try {
      await shareToKakao(title, description, eventImageUrl, eventUrl);
    } catch {
      alert('카카오 공유하기에 실패했습니다.');
    }
  };

  /* navigator.clipboard가 HTTPS, localhosts 에서만 작동하므로 배포 후 코드 변경해야함
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      alert('링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  }; 
  */

  const handleCopyLink = () => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard
        .writeText(eventUrl)
        .then(() => alert('링크가 복사되었습니다!'))
        .catch(() => {
          alert('링크 복사에 실패했습니다.');
        });
    } else {
      // Fallback (입력창 생성해서 수동 복사 유도)
      const textArea = document.createElement('textarea');
      textArea.value = eventUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 mx-auto w-full max-w-lg bg-black bg-opacity-30" onClick={closeModal}></div>
      <div
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-lg bg-white rounded-t-[20px] px-6 py-4"
      >
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-black bg-opacity-30 rounded-full mb-3" />
        </div>
        <h1 className="font-semibold text-xl text-center mb-6">공유하기</h1>
        <div className="flex items-center gap-5 mb-8">
          <EventInfo eventImageUrl={eventImageUrl} title={title} />
        </div>
        <div className="flex flex-col gap-4 py-3">
          <div onClick={handleCopyLink} className="flex items-center gap-4 cursor-pointer">
            <img src={link} alt="링크" className="w-6 h-6" />
            <h2 className="text-base">링크 복사하기</h2>
          </div>
          <hr />
          <div onClick={handleKakaoShare} className="flex items-center gap-4 cursor-pointer">
            <img src={kakao} alt="카카오" className="w-6 h-6" />
            <h2 className="text-base">카카오톡 공유하기</h2>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};
export default ShareEventModal;
