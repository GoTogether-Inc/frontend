import Ticket from '../../../public/assets/menu/Ticket.svg';
import Host from '../../../public/assets/menu/Host.svg';
import Event from '../../../design-system/icons/Event.svg';
import Setting from '../../../public/assets/menu/Setting.svg';
import Logout from '../../../public/assets/menu/Logout.svg';
import SelectedTicket from '../../../public/assets/menu/SelectedTicket.svg';
import SelectedEvent from '../../..//design-system/icons/SelectedEvent.svg';
import SelectedHost from '../../../public/assets/menu/SelectedHost.svg';
import SelectedLogout from '../../../public/assets/menu/SelectedLogout.svg';
import SelectedSetting from '../../../public/assets/menu/SelectedSetting.svg';
import useAuthStore from '../../app/provider/authStore';
import Manual from '../../../public/assets/menu/manual.svg';
import SelectedManual from '../../../public/assets/menu/SelectedManual.svg';

export const USER_MANUAL_URL = 'https://namu00.notion.site/209eaffb9b0e803d9bc3da1fa0be5496';
export const HOST_MANUAL_URL = 'https://namu00.notion.site/209eaffb9b0e80caa0dae68c1e12ed0f';


export interface buttonData {
  iconPath: string; // 아이콘 경로
  hoverIconPath: string; // 호버 아이콘 경로
  label: string; // 버튼 텍스트
  path: string; // 경로
  url?: string; // 외부 url
  backPath?: string
}

export const getButtonData = (): buttonData[] => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const baseButtons: buttonData[] = [
    { iconPath: Ticket, hoverIconPath: SelectedTicket, label: '구입한 티켓', path: '/menu/myTicket' },
    { iconPath: Host, hoverIconPath: SelectedHost, label: '내 호스트', path: '/menu/myHost' },
    { iconPath: Event, hoverIconPath: SelectedEvent, label: '이벤트 주최하기', path: '/event-creation', backPath:'/menu' },
    { iconPath: Setting, hoverIconPath: SelectedSetting, label: '마이페이지', path: '/menu/myPage' },
    { iconPath: Manual, hoverIconPath: SelectedManual, label: '사용법', path: '/menu/myTicket', url: USER_MANUAL_URL },
  ];

  if (isLoggedIn) {
    return [
      ...baseButtons,
      { iconPath: Logout, hoverIconPath: SelectedLogout, label: '로그아웃', path: '/menu/logout' },
    ];
  }

  return baseButtons;
};
