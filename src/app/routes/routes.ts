export const MAIN_ROUTES = {
  main: '/',
  eventCreation: '/event-creation',
  allEvents: '/all-events',
  eventDatail: '/event-details',
  search: '/search',
  menu: '/menu',
  dashbord: '/dashboard',
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
  dashboard: `${MAIN_ROUTES.dashbord}`,
  eventInfo: `${MAIN_ROUTES.dashbord}/eventInfo`,
  eventDetail: `${MAIN_ROUTES.dashbord}/eventDetail`,
  eventTag: `${MAIN_ROUTES.dashbord}/eventTag`,
  ticket: `${MAIN_ROUTES.dashbord}/ticket`,
  ticketCreate: `${MAIN_ROUTES.dashbord}/ticket/create`,
  email: `${MAIN_ROUTES.dashbord}/email`,
  mailBox: `${MAIN_ROUTES.dashbord}/mailBox`,
  emailEdit: `${MAIN_ROUTES.dashbord}/edit-email`,
  participantsMangement: `${MAIN_ROUTES.dashbord}/participants-mangement`,
};

export const PAYMENT_ROUTES = {
  cardRegister: `${MAIN_ROUTES.payment}/cardRegister`,
  payment: `${MAIN_ROUTES.payment}`,
};
