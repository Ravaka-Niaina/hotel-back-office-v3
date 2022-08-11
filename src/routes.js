import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import RatePlan from './pages/RatePlan';
import Calendar from './pages/Calendar';
import Promotion from './pages/Promotion';
import TypeChambre from './pages/TypeChambre';
import AccessRight from './pages/AccessRight';
import User from './pages/User';
import Login from './pages/Login';
import VerifyCode from './pages/VerifyCode';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import TestSideBar from './pages/TestSideBar';
import TestFormulaire from './pages/TestFormulaire';
import HomeForm from './pages/HomeForm';
import RapportApp from './pages/RapportApp';

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
        { path: 'products', element: <Products /> },
        { path: 'promotion', element: <Promotion /> },
        { path: 'typeChambre', element: <TypeChambre /> },
      ],
    },
    {
      path: '/testform',
      element: <TestFormulaire />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'verifycode', element: <VerifyCode /> },
        // { path: 'register', element: <Register /> },
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
