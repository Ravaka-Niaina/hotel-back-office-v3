import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../../components/dashboardLayout';
import Layout from '../../components/Layout';
//
import Politic from '../../views/Politic';
import UpdateHotel from '../../views/Hotel/UpdateHotel';
import CreateOrDeleteHotel from '../../views/Hotel/CreateOrDeleteHotel';
import ChooseHotelToManage from '../../views/Hotel/ChooseHotelToManage';
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
import HomeForm from '../../views/HomeForm';
import RapportApp from '../../views/RapportApp';
import EmailModel from '../../views/EmailModel';
import Booking from '../../views/Booking';
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
          path: 'booking',
          element: <Protected child={<Booking/>} allowedRoles={getAllowedRoles(`${dashboardPath}/booking`)} />,
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
          path: 'updateHotel',
          element: <Protected child={<UpdateHotel />} allowedRoles={getAllowedRoles(`${dashboardPath}/hotel`)} />,
        },
        {
          path: 'createOrDeleteHotel',
          element: <Protected child={<CreateOrDeleteHotel />} allowedRoles={getAllowedRoles(`${dashboardPath}/hotel`)} />,
        },
        {
          path: 'chooseHotelToManage',
          element: <Protected child={<ChooseHotelToManage />} allowedRoles={getAllowedRoles(`${dashboardPath}/hotel`)} />,
        },
        // {
        //   path: 'emailModel',
        //   element: <Protected child={<EmailModel />} allowedRoles={getAllowedRoles(`${dashboardPath}/emailModel`)} />,
        // },
        { 
          path: 'emailModel',
          element: <EmailModel />,
        },
        { path: '*', element: <NotFound /> },
      ],
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
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
