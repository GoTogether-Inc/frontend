export const MAIN_ROUTES = {
  main: '/',
  eventCreation: '/event-creation',
  allEvents: '/all-events',
  search: '/search',
  menu: `/menu`,
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
};
