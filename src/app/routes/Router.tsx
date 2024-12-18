import { createBrowserRouter } from 'react-router-dom';
import { MAIN_ROUTES, JOIN_ROUTES } from './routes';
import Layout from '../Layout';
import AgreementPage from '../../pages/join/AgreementPage';
import InfoInputPage from '../../pages/join/InfoInputPage';
import MainPage from '../../pages/home/ui/MainPage';
import FunnelPage from '../../pages/event-manage/ui/FunnelPage';

const routesConfig = [
  {
    path: MAIN_ROUTES.main,
    element: <MainPage />,
    requiresAuth: false,
  },
  {
    path: JOIN_ROUTES.agreement, // 회원가입 경로 추가
    element: <AgreementPage />,
    requiresAuth: false,
  },
  {
    path: JOIN_ROUTES.infoInput, // 회원가입 경로 추가
    element: <InfoInputPage />,
    requiresAuth: false,
  },
  {
    path: MAIN_ROUTES.eventCreation,
    element: <FunnelPage />,
    requiresAuth: false,
  },
];

const router = createBrowserRouter(
  routesConfig.map(route => ({
    path: route.path,
    element: route.requiresAuth ? <Layout>{route.element}</Layout> : <Layout>{route.element}</Layout>,
  }))
);

export default router;
