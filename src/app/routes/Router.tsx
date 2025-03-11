import { createBrowserRouter } from 'react-router-dom';
import { MAIN_ROUTES, JOIN_ROUTES, MENU_ROUTES, DASHBOARD_ROUTES, PAYMENT_ROUTES } from './routes';
import Layout from '../Layout';
import AgreementPage from '../../pages/join/AgreementPage';
import InfoInputPage from '../../pages/join/InfoInputPage';
import MainPage from '../../pages/home/ui/MainPage';
import FunnelPage from '../../pages/event-manage/ui/FunnelPage';
import AllEventsPage from '../../pages/event/ui/AllEventsPage';
import MyTicketPage from '../../pages/menu/ui/MyTicketPage';
import SearchPage from '../../pages/search/ui/SearchPage';

import MyHostPage from '../../pages/menu/ui/myHost/MyHostPage';
import HostDetailPage from '../../pages/menu/ui/myHost/HostDetailPage';
import HostEditPage from '../../pages/menu/ui/myHost/HostEditPage';
import MyPage from '../../pages/menu/ui/MyPage';
import MenuPage from '../../pages/menu/ui/MenuPage';
import DashboardPage from '../../pages/dashboard/ui/DashbaordPage';
import EventInfoPage from '../../pages/dashboard/ui/EventInfoPage';
import EventDetailPage from '../../pages/dashboard/ui/EventDetailPage';
import EventTagPage from '../../pages/dashboard/ui/EventTagPage';
import TicketListPage from '../../pages/dashboard/ui/ticket/TicketListPage';
import TicketCreatePage from '../../pages/dashboard/ui/ticket/TicketCreatePage';
import HostInfoPage from '../../pages/menu/ui/myHost/HostInfoPage';
import EmailPage from '../../pages/dashboard/ui/mail/EmailPage';
import EventDetailsPage from '../../pages/event/ui/EventDetailsPage';
import CardRegisterPage from '../../pages/payment/ui/CardRegisterPage';
import ParticipantsManagementPage from '../../pages/dashboard/ui/ParticipantsMangementPage';
import MailBoxPage from '../../pages/dashboard/ui/mail/MailBoxPage';
import EmailEditPage from '../../pages/dashboard/ui/mail/EmailEditPage';
import PaymentPage from '../../pages/payment/ui/PaymentPage';
import TicketConfirmPage from '../../pages/dashboard/ui/ticket/TIcketConfirmPage';
import TicketOptionPage from '../../pages/dashboard/ui/ticket/TicketOptionPage';
import TicketOptionCreatePage from '../../pages/dashboard/ui/ticket/TicketOptionCreatePage';
import ResponseManagementPage from '../../pages/dashboard/ui/ResponsesManagementPage';
import TicketOptionResponsePage from '../../pages/dashboard/ui/ticket/TicketOptionResponsePage';

const mainRoutes = [
  { path: MAIN_ROUTES.main, element: <MainPage />, requiresAuth: false },
  { path: MAIN_ROUTES.eventCreation, element: <FunnelPage />, requiresAuth: false },
  { path: MAIN_ROUTES.allEvents, element: <AllEventsPage />, requiresAuth: false },
  { path: MAIN_ROUTES.eventDatail, element: <EventDetailsPage />, requiresAuth: false },
  { path: MAIN_ROUTES.search, element: <SearchPage />, requiresAuth: false },
  { path: MAIN_ROUTES.menu, element: <MenuPage />, requiresAuth: false },
  { path: MAIN_ROUTES.payment, element: <PaymentPage />, requiresAuth: false },
];

const joinRoutes = [
  { path: JOIN_ROUTES.agreement, element: <AgreementPage />, requiresAuth: false },
  { path: JOIN_ROUTES.infoInput, element: <InfoInputPage />, requiresAuth: false },
];

const menuRoutes = [
  { path: MENU_ROUTES.myTicket, element: <MyTicketPage />, requiresAuth: false },
  { path: MENU_ROUTES.myHost, element: <MyHostPage />, requiresAuth: false },
  { path: MENU_ROUTES.hostDetail, element: <HostDetailPage />, requiresAuth: false },
  { path: MENU_ROUTES.hostEdit, element: <HostEditPage />, requiresAuth: false },
  { path: MENU_ROUTES.myPage, element: <MyPage />, requiresAuth: false },
  { path: MENU_ROUTES.hostInfo, element: <HostInfoPage />, requiresAuth: false },
];

const dashboardRoutes = [
  { path: DASHBOARD_ROUTES.dashboard, element: <DashboardPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.eventInfo, element: <EventInfoPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.eventDetail, element: <EventDetailPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.eventTag, element: <EventTagPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.ticketCreate, element: <TicketCreatePage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.ticket, element: <TicketListPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.ticketOption, element: <TicketOptionPage />, requiersAuth: false },
  { path: DASHBOARD_ROUTES.ticketOptionCreate, element: <TicketOptionCreatePage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.email, element: <EmailPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.mailBox, element: <MailBoxPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.emailEdit, element: <EmailEditPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.participantsMangement, element: <ParticipantsManagementPage />, requiresAuth: false },
  { path: DASHBOARD_ROUTES.responsesManagement, element: <ResponseManagementPage />, requiresAuth: false },
];

const paymentRoutes = [
  { path: PAYMENT_ROUTES.cardRegister, element: <CardRegisterPage />, requiresAuth: false },
  { path: PAYMENT_ROUTES.ticketConfirm, element: <TicketConfirmPage />, requiresAuth: false },
  { path: PAYMENT_ROUTES.ticketOptionResponse, element: <TicketOptionResponsePage />, requiresAuth: false },
];

const routesConfig = [...mainRoutes, ...joinRoutes, ...menuRoutes, ...dashboardRoutes, ...paymentRoutes];

const router = createBrowserRouter(
  routesConfig.map(route => ({
    path: route.path,
    element: route.requiresAuth ? <Layout>{route.element}</Layout> : <Layout>{route.element}</Layout>,
  }))
);

export default router;
