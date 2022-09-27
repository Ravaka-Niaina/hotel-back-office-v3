import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import GeneralConditionsOfSale from '../../views/GeneralConditionsOfSale';
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
import EmailModel from '../../views/EmailModel';
import Protected from '../../components/protected/Protected';
import { getAllowedRoles } from '../../services/AllowedRoles';
// ----------------------------------------------------------------------
/**
 * @file routes
 */

/**
 * @component
 * @description A react component to configure the routes of the application
 * @returns {hook} useRoutes hook
 */
export default function Router() {
  const dashboardPath = '/dashboard';
  return useRoutes([
    {
      path: dashboardPath,
      element: <DashboardLayout />,
      children: [
        {
          path: 'app',
          element: <Protected child={<DashboardApp />} allowedRoles={getAllowedRoles(`${dashboardPath}/app`)} />,
        },
        {
          path: 'homeForm',
          element: <Protected child={<HomeForm />} allowedRoles={getAllowedRoles(`${dashboardPath}/homeForm`)} />,
        },
        {
          path: 'rapport',
          element: <Protected child={<RapportApp />} allowedRoles={getAllowedRoles(`${dashboardPath}/rapport`)} />,
        },
        {
          path: 'ratePlan',
          element: <Protected child={<RatePlan />} allowedRoles={getAllowedRoles(`${dashboardPath}/ratePlan`)} />,
        },
        {
          path: 'calendar',
          element: <Protected child={<Calendar />} allowedRoles={getAllowedRoles(`${dashboardPath}/calendar`)} />,
        },
        {
          path: 'accessRight',
          element: <Protected child={<AccessRight />} allowedRoles={getAllowedRoles(`${dashboardPath}/accessRight`)} />,
        },
        {
          path: 'user',
          element: <Protected child={<User />} allowedRoles={getAllowedRoles(`${dashboardPath}/user`)} />,
        },
        {
          path: 'promotion',
          element: <Protected child={<Promotion />} allowedRoles={getAllowedRoles(`${dashboardPath}/promotion`)} />,
        },
        {
          path: 'typeChambre',
          element: <Protected child={<TypeChambre />} allowedRoles={getAllowedRoles(`${dashboardPath}/typeChambre`)} />,
        },
        {
          path: 'politic',
          element: <Protected child={<Politic />} allowedRoles={getAllowedRoles(`${dashboardPath}/politic`)} />,
        },
        {
          path: 'hotel',
          element: <Protected child={<Hotel />} allowedRoles={getAllowedRoles(`${dashboardPath}/hotel`)} />,
        },
        {
          path: 'emailModel',
          element: <Protected child={<EmailModel />} allowedRoles={getAllowedRoles(`${dashboardPath}/emailModel`)} />,
        },
        {
          path: 'generalConditionsOfSale',
          element: <Protected child={<GeneralConditionsOfSale />} allowedRoles={getAllowedRoles(`${dashboardPath}/generalConditionsOfSale`)} />,
        },
        { path: '*', element: <NotFound /> },
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
        { path: '/', element: <Navigate to="/dashboard/app" /> },
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
