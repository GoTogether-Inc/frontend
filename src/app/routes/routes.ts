export const MAIN_ROUTES = {
  main: '/',
  eventCreation: '/event-creation',
  allEvents: '/all-events',
  eventDatail: '/event-details',
  search: '/search',
  menu: '/menu',
  dashboard: '/dashboard',
  payment: '/payment',
};

export const AUTH_ROUTES = {
  // 인증이 필요한 페이지
};

export const JOIN_ROUTES = {
  // 회원가입 관련 페이지
  agreement: '/join/agreement', // 이용약관 페이지
  infoInput: '/join/info-input', // 정보입력 페이지
};

export const MENU_ROUTES = {
  menuBar: `${MAIN_ROUTES.menu}`,
  myTicket: `${MAIN_ROUTES.menu}/myTicket`,
  myHost: `${MAIN_ROUTES.menu}/myHost`,
  hostDetail: `${MAIN_ROUTES.menu}/hostDetail/:id`,
  hostEdit: `${MAIN_ROUTES.menu}/hostEdit/:id`,
  myPage: `${MAIN_ROUTES.menu}/myPage`,
  hostInfo: `${MAIN_ROUTES.menu}/hostInfo/:id`,
};

export const DASHBOARD_ROUTES = {
  dashboard: `${MAIN_ROUTES.dashboard}`,
  eventInfo: `${MAIN_ROUTES.dashboard}/eventInfo`,
  eventDetail: `${MAIN_ROUTES.dashboard}/eventDetail`,
  eventTag: `${MAIN_ROUTES.dashboard}/eventTag`,
  ticket: `${MAIN_ROUTES.dashboard}/ticket`,
  ticketCreate: `${MAIN_ROUTES.dashboard}/ticket/create`,
  email: `${MAIN_ROUTES.dashboard}/email`,
  mailBox: `${MAIN_ROUTES.dashboard}/mailBox`,
  emailEdit: `${MAIN_ROUTES.dashboard}/edit-email`,
  participantsMangement: `${MAIN_ROUTES.dashboard}/participants-mangement`,
  responsesManagement:`${MAIN_ROUTES.dashboard}/responses-management`,
};

export const PAYMENT_ROUTES = {
  payment: `${MAIN_ROUTES.payment}`,
  cardRegister: `${MAIN_ROUTES.payment}/cardRegister`,
  ticketConfirm: `${MAIN_ROUTES.payment}/ticket-confirm`,
};
