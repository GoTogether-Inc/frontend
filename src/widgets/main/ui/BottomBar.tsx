import MenuIcon from '../../../../public/assets/bottomBar/MenuIcon.svg';
import EventIcon from '../../../../public/assets/bottomBar/EventIcon.svg';
import HomeIcon from '../../../../public/assets/bottomBar/HomeIcon.svg';
import InterestIcon from '../../../../public/assets/bottomBar/InterestIcon.svg';
import MypageIcon from '../../../../public/assets/bottomBar/MypageIcon.svg';

const BottomBar = () => {
  return (
    <div className="flex justify-between fixed bottom-0 w-full max-w-lg h-20 rounded-t-[10px] bg-white border-t border-t-gray4">
      <div className="flex flex-col justify-center items-center w-24 h-20">
        <img src={MenuIcon} alt="MenuIcon" className="w-6 h-5 md:w-7 md:h-6 object-contain" />
        <span className="text-sm mt-2">메뉴</span>
      </div>

      <div className="flex flex-col justify-center items-center w-24 h-20">
        <img src={EventIcon} alt="EventIcon" className="w-8 h-6 md:w-10 md:h-7 object-contain" />
        <span className="text-sm mt-2">이벤트</span>
      </div>

      <div className="flex flex-col justify-center items-center w-24 h-20">
        <img src={HomeIcon} alt="HomeIcon" className="w-8 h-6 md:w-10 md:h-7 object-contain" />
        <span className="text-sm mt-2">홈</span>
      </div>

      <div className="flex flex-col justify-center items-center w-24 h-20">
        <img src={InterestIcon} alt="InterestIcon" className="w-8 h-7 md:w-10 md:h-9 object-contain mb-1" />
        <span className="text-sm mb-1">관심</span>
      </div>

      <div className="flex flex-col justify-center items-center w-24 h-20">
        <img src={MypageIcon} alt="MypageIcon" className="w-8 h-6 md:w-10 md:h-7 object-contain" />
        <span className="text-sm mt-2">마이페이지</span>
      </div>
    </div>
  );
};
export default BottomBar;
