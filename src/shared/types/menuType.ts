import Ticket from '../../../public/assets/menu-ticket.svg';
import Host from '../../../public/assets/menu-host.svg';
import Event from '../../../design-system/icons/menu-event.svg';
import Setting from '../../../public/assets/menu-setting.svg';
import Logout from '../../../public/assets/menu-logout.svg';
import SelectedEvent from '../../..//design-system/icons/selected-event.svg';
import SelectedHost from '../../../public/assets/selected-host.svg';
import SelectedLogout from '../../../public/assets/selected-logout.svg';

export interface ButtonData {
  iconPath: string; // 아이콘 경로
  hoverIconPath: string; // 호버 아이콘 경로
  label: string; // 버튼 텍스트
  path: string; // 경로
}

export const buttonData: ButtonData[] = [
  { iconPath: Ticket, hoverIconPath: Ticket, label: '구입한 티켓', path: '/menu/myTicket' },
  { iconPath: Host, hoverIconPath: SelectedHost, label: '내 호스트', path: 'menu/myHost' },
  { iconPath: Event, hoverIconPath: SelectedEvent, label: '이벤트 주최하기', path: '/event-creation' },
  { iconPath: Setting, hoverIconPath: Setting, label: '프로필&결제 정보', path: '/menu/setting' },
  { iconPath: Logout, hoverIconPath: SelectedLogout, label: '로그아웃', path: '/menu/logout' },
];
