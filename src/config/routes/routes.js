import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts

import DashboardLayout from '../../components/dashboardLayout';
import { getAllowedRoles } from '../../services/AllowedRoles';
import Protected from '../../components/protected/Protected';

import Preloader from '../../components/Preloader/Preloader';
//
const Politic = lazy(()=>import('../../views/Politic'));
const UpdateHotel = lazy(() => import('../../views/Hotel/UpdateHotel'));
const ChooseHotelToManage = lazy(() => import('../../views/Hotel/ChooseHotelToManage'));
const RatePlan = lazy(() => import('../../views/RatePlan'));
const Calendar = lazy(() => import('../../views/Calendar'));
const Promotion = lazy(() => import('../../views/Promotion'));
const TypeChambre = lazy(() => import('../../views/RoomType'));
const User = lazy(() => import('../../views/User'));
const Login = lazy(() => import('../../views/Login'));
const VerifyCode = lazy(() => import('../../views/VerifyCode'));
const SendCodeResetPassword = lazy(() => import('../../views/SendCodeResetPassword'));
const EnterCodeResetPassword = lazy(() => import('../../views/EnterCodeResetPassword'));
const EnterNewPassword = lazy(() => import('../../views/EnterNewPassword'));

const Dashboard = lazy(() => import('../../views/dashboard/Dashboard.tsx'));
const NotFound = lazy(() => import('../../views/Page404'));
const DashboardApp = lazy(() => import('../../views/DashboardApp'));
const HomeForm = lazy(() => import('../../views/HomeForm'));
const RapportApp = lazy(() => import('../../views/RapportApp'));
const EmailModel = lazy(() => import('../../views/EmailModel'));
const EmailModelOld = lazy(() => import('../../views/EmailModelOld'));
const Booking = lazy(() => import('../../views/Booking'));
const HistoricRoomType = lazy(() => import('../../views/historic/HistoricRoomType'));
const HistoricRatePlan = lazy(() => import('../../views/historic/HistoricRatePlan'));
const HistoricAvailability = lazy(() => import('../../views/historic/HistoricAvailability'));
const HistoricPromotion = lazy(() => import('../../views/historic/HistoricPromotion'));
const HistoricPolitic = lazy(() => import('../../views/historic/HistoricPolitic'));



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
          path: 'index',
          element: <Protected child={<Dashboard />} allowedRoles={getAllowedRoles(`${dashboardPath}/index`)} />,
        },
        {
          path: 'app',
          element: <Protected child={<Calendar />} allowedRoles={getAllowedRoles(`${dashboardPath}/app`)} />,
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
        // {
        //   path: 'calendar',
        //   element: <Protected child={<Calendar />} allowedRoles={getAllowedRoles(`${dashboardPath}/calendar`)} />,
        // },
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
          path: 'historic/roomType',
          element: <Protected child={<HistoricRoomType />} allowedRoles={getAllowedRoles(`${dashboardPath}/historic/roomType`)} />,
        },
        {
          path: 'historic/ratePlan',
          element: <Protected child={<HistoricRatePlan />} allowedRoles={getAllowedRoles(`${dashboardPath}/historic/ratePlan`)} />,
        },
        {
          path: 'historic/availability',
          element: <Protected child={<HistoricAvailability />} allowedRoles={getAllowedRoles(`${dashboardPath}/historic/availability`)} />,
        },
        {
          path: 'historic/promotion',
          element: <Protected child={<HistoricPromotion />} allowedRoles={getAllowedRoles(`${dashboardPath}/historic/promotion`)} />,
        },
        {
          path: 'historic/politic',
          element: <Protected child={<HistoricPolitic />} allowedRoles={getAllowedRoles(`${dashboardPath}/historic/politic`)} />,
        },
        // {
        //   path: 'emailModel',
        //   element: <Protected child={<EmailModel />} allowedRoles={getAllowedRoles(`${dashboardPath}/emailModel`)} />,
        // },
        // { 
        //   path: 'emailModel',
        //   element: <EmailModel />,
        // },
        { 
          path: 'emailModel',
          element: <EmailModelOld />,
        },
        { path: '*', element: <NotFound /> },
      ],
    },
    { path: '/', element: <Navigate to="/login" /> },
    { path: 'load', element: <Preloader /> },
    { path: 'login', element: <Login /> },
    { path: 'verifycode', element: <VerifyCode /> },
    { path: 'sendCodeResetPassword', element: <SendCodeResetPassword /> },
    { path: 'enterCodeResetPassword/:userId', element: <EnterCodeResetPassword /> },
    { path: 'enterNewPassword/:userId', element: <EnterNewPassword /> },
    {
      path: 'chooseHotelToManage',
      element: <Protected child={<ChooseHotelToManage />} allowedRoles={getAllowedRoles(`${dashboardPath}/hotel`)} />,
    },
    { path: '*', element: <NotFound /> },
  ]);
}
