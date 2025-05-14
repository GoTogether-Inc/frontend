import profile from '../../../../public/assets/banners/1.png';
import link from '../../../../public/assets/event-manage/details/Link.svg';
import kakao from '../../../../public/assets/event-manage/details/KaKao.svg';
import { shareToKakao } from '../../../shared/lib/kakaoShare';

interface ShareEventModalProps {
  closeModal: () => void;
  eventName: string;
  eventDescription?: string;
  eventImageUrl?: string;
  eventUrl?: string;
}

const ShareEventModal = ({
  closeModal,
  eventName,
  eventDescription = '',
  eventImageUrl = '',
  eventUrl = window.location.href,
}: ShareEventModalProps) => {
  const handleKakaoShare = async () => {
    try {
      await shareToKakao(eventName, eventDescription, eventImageUrl, eventUrl);
    } catch (error) {
      console.error('카카오 공유 실패:', error);
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
        .catch(err => {
          console.error('복사 실패:', err);
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
      <div onClick={e => e.stopPropagation()} className="relative w-full max-w-lg bg-white rounded-t-[20px] px-6 py-4">
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-black bg-opacity-30 rounded-full mb-3" />
        </div>
        <h1 className="font-semibold text-xl text-center mb-6">공유하기</h1>
        <div className="flex items-center gap-5 mb-8">
          <img src={profile} alt="프로필 사진" className="w-20 h-20 rounded-[5px]" />
          <span className="font-semibold text-lg">{eventName}</span>
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
