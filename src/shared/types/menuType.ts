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

export interface buttonData {
  iconPath: string; // 아이콘 경로
  hoverIconPath: string; // 호버 아이콘 경로
  label: string; // 버튼 텍스트
  path: string; // 경로
}

export const buttonData: buttonData[] = [
  { iconPath: Ticket, hoverIconPath: SelectedTicket, label: '구입한 티켓', path: '/menu/myTicket' },
  { iconPath: Host, hoverIconPath: SelectedHost, label: '내 호스트', path: '/menu/myHost' },
  { iconPath: Event, hoverIconPath: SelectedEvent, label: '이벤트 주최하기', path: '/event-creation' },
  { iconPath: Setting, hoverIconPath: SelectedSetting, label: '프로필&결제 정보', path: '/menu/myPage' },
  { iconPath: Logout, hoverIconPath: SelectedLogout, label: '로그아웃', path: '/menu/logout' },
];
