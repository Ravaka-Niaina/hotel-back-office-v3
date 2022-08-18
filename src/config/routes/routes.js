import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../../components/dashboardLayout';
import Layout from '../../components/Layout';
//
import Politic from '../../views/Politic';
import Hotel from '../../views/Hotel';
import RatePlan from '../../views/RatePlan';
import Calendar from '../../views/Calendar';
import Promotion from '../../views/Promotion';
import TypeChambre from '../../views/RoomType';
import AccessRight from '../../views/AccessRight';
import User from '../../views/User';
import Login from '../../views/Login';
import VerifyCode from '../../views/VerifyCode';
import NotFound from '../../views/Page404';
import DashboardApp from '../../views/DashboardApp';
import TestSideBar from '../../views/TestSideBar';
import TestFormulaire from '../../views/TestFormulaire';
import HomeForm from '../../views/HomeForm';
import RapportApp from '../../views/RapportApp';
// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'homeForm', element: <HomeForm /> },
        { path: 'rapport', element: <RapportApp /> },
        { path: 'ratePlan', element: <RatePlan /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'accessRight', element: <AccessRight /> },
        { path: 'user', element: <User /> },
        { path: 'promotion', element: <Promotion /> },
        { path: 'typeChambre', element: <TypeChambre /> },
        { path: 'politic', element: <Politic /> },
        { path: 'hotel', element: <Hotel /> },
      ],
    },
    {
      path: '/testform',
      element: <TestFormulaire />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/TestSideBar',
      element: <TestSideBar />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
