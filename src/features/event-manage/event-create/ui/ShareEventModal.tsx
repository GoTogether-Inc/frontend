import profile from '../../../../../public/assets/banners/1.png';
import link from '../../../../../public/assets/event-manage/details/Link.svg';
import kakao from '../../../../../public/assets/event-manage/details/KaKao.svg';

interface ShareEventModalProp {
  closeModal: () => void;
  eventName: string;
}

const ShareEventModal = ({ closeModal, eventName }: ShareEventModalProp) => {
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
          <div className="flex items-center gap-4">
            <img src={link} alt="링크" className="w-6 h-6" />
            <h2 className="text-base">링크 복사하기</h2>
          </div>
          <hr />
          <div className="flex items-center gap-4">
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
