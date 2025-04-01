import dashboard from '../../../public/assets/dashboard/menu/Dashboard(black).svg';
import clickedDashboard from '../../../public/assets/dashboard/menu/Dashboard(pink).svg';
import eventInfo from '../../../public/assets/dashboard/menu/EventInfo(black).svg';
import clickedEventInfo from '../../../public/assets/dashboard/menu/EventInfo(pink).svg';
import eventDetail from '../../../public/assets/dashboard/menu/EventDetail(black).svg';
import clickedEventDetail from '../../../public/assets/dashboard/menu/EventDetail(pink).svg';
import tag from '../../../public/assets/dashboard/menu/Tag(black).svg';
import clickedTag from '../../../public/assets/dashboard/menu/Tag(pink).svg';
import ticket from '../../../public/assets/dashboard/menu/Ticket(black).svg';
import clickedTicket from '../../../public/assets/dashboard/menu/Ticket(pink).svg';
import option from '../../../public/assets/dashboard/ticket/option(black).svg';
import clickedOption from '../../../public/assets/dashboard/ticket/option(pink).svg';
import email from '../../../public/assets/dashboard/menu/Email(black).svg';
import clickedEmail from '../../../public/assets/dashboard/menu/Email(pink).svg';
import sentEmail from '../../../public/assets/dashboard/menu/SentMail(black).svg';
import clickedSentEmail from '../../../public/assets/dashboard/menu/SentMail(pink).svg';
import participants from '../../../public/assets/dashboard/menu/Participants(black).svg';
import clickedParticipants from '../../../public/assets/dashboard/menu/Participants(pink).svg';

export interface menuListsData {
  text: string;
  icon: string;
  clickedIcon: string;
  path: string;
}

export interface dashboardData {
  eventName: string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndDate: string;
  eventEndTime: string;
  totalTicketCnt: number;
  totalPrice: number;
  ticket: boolean;
  ticketOption: boolean;
}

export const getMenuLists = (id: string | number) => [
  { text: '대시보드', icon: dashboard, clickedIcon: clickedDashboard, path: `/dashboard/${id}` },
  { text: '이벤트 기본 정보', icon: eventInfo, clickedIcon: clickedEventInfo, path: `/dashboard/${id}/eventInfo` },
  { text: '티켓에 추가 옵션 부착', icon: option, clickedIcon: clickedOption, path: '/dashboard/ticket/option' }, // icon, clickedIcon에 들어갈 .svg 알아보기
  {
    text: '이벤트 상세와 사진',
    icon: eventDetail,
    clickedIcon: clickedEventDetail,
    path: `/dashboard/${id}/eventDetail`,
  },
  { text: '이벤트 태그 정보', icon: tag, clickedIcon: clickedTag, path: `/dashboard/${id}/eventTag` },
  { text: '티켓 생성하기', icon: ticket, clickedIcon: clickedTicket, path: `/dashboard/${id}/ticket` },
  { text: '이메일 예약 발송', icon: email, clickedIcon: clickedEmail, path: `/dashboard/${id}/email` },
  { text: '보낸 이메일', icon: sentEmail, clickedIcon: clickedSentEmail, path: `/dashboard/${id}/mailBox` },
  {
    text: '구매/참가자 관리',
    icon: participants,
    clickedIcon: clickedParticipants,
    path: `/dashboard/${id}/participants-management`,
  },
];
