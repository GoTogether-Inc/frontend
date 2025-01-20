import MenuIcon from '../../../public/assets/bottomBar/MenuIcon.svg';
import EventIcon from '../../../public/assets/bottomBar/EventIcon.svg';
import HomeIcon from '../../../public/assets/bottomBar/HomeIcon.svg';
import InterestIcon from '../../../public/assets/bottomBar/InterestIcon.svg';
import MypageIcon from '../../../public/assets/bottomBar/MypageIcon.svg';

export interface bottomBarData {
  icon: string;
  iconClassName: string;
  label: string;
  path: string;
}

export const bottomBar: bottomBarData[] = [
  { label: '메뉴', icon: MenuIcon, iconClassName: 'w-6 h-5 md:w-7 md:h-6', path: '/menu' },
  { label: '이벤트', icon: EventIcon, iconClassName: 'w-8 h-6 md:w-10 md:h-7', path: '/event-creation' },
  { label: '홈', icon: HomeIcon, iconClassName: 'w-8 h-6 md:w-10 md:h-7', path: '/' },
  { label: '관심', icon: InterestIcon, iconClassName: 'w-8 h-7 md:w-10 md:h-9 mb-1', path: '/interest' },
  { label: '마이페이지', icon: MypageIcon, iconClassName: 'w-8 h-6 md:w-10 md:h-7', path: '/mypage' },
];
