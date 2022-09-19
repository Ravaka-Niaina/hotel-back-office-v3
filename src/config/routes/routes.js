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
// import NotFound from '../../views/Page404';
import DashboardApp from '../../views/DashboardApp';
import TestSideBar from '../../views/TestSideBar';
import TestFormulaire from '../../views/TestFormulaire';
import HomeForm from '../../views/HomeForm';
import RapportApp from '../../views/RapportApp';
import Protected from '../../components/protected/Protected';
// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Protected child={<DashboardApp />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'homeForm', element: <Protected child={<HomeForm />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'rapport', element: <Protected child={<RapportApp />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'ratePlan', element: <Protected child={<RatePlan />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'calendar', element: <Protected child={<Calendar />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'accessRight', element: <Protected child={<AccessRight />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'user', element: <Protected child={<User />} allowedRoles={['superAdmin','admin']} /> },
        { path: 'promotion', element: <Protected child={<Promotion />} allowedRoles={['superAdmin','admin']} /> },
        { path: 'typeChambre', element: <Protected child={<TypeChambre />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'politic', element: <Protected child={<Politic />} allowedRoles={['superAdmin','admin', 'partner']} /> },
        { path: 'hotel', element: <Protected child={<Hotel />} allowedRoles={['superAdmin','admin', 'partner']} /> }
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
        { path: '404', element: <Navigate to="/dashboard/app" /> },
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
