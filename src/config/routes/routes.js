import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts

import DashboardLayout from '../../components/dashboardLayout';
import Layout from '../../components/Layout';
import { getAllowedRoles } from '../../services/AllowedRoles';
//
const Politic = lazy(()=>import('../../views/Politic'));
const UpdateHotel = lazy(() => import('../../views/Hotel/UpdateHotel'));
const CreateOrDeleteHotel = lazy(() => import('../../views/Hotel/CreateOrDeleteHotel'));
const ChooseHotelToManage = lazy(() => import('../../views/Hotel/ChooseHotelToManage'));
const RatePlan = lazy(() => import('../../views/RatePlan'));
const Calendar = lazy(() => import('../../views/Calendar'));
const Promotion = lazy(() => import('../../views/Promotion'));
const TypeChambre = lazy(() => import('../../views/RoomType'));
const AccessRight = lazy(() => import('../../views/AccessRight'));
const User = lazy(() => import('../../views/User'));
const Login = lazy(() => import('../../views/Login'));
const VerifyCode = lazy(() => import('../../views/VerifyCode'));
const NotFound = lazy(() => import('../../views/Page404'));
const DashboardApp = lazy(() => import('../../views/DashboardApp'));
const HomeForm = lazy(() => import('../../views/HomeForm'));
const RapportApp = lazy(() => import('../../views/RapportApp'));
const EmailModel = lazy(() => import('../../views/EmailModel'));
const Booking = lazy(() => import('../../views/Booking'));
const Protected = lazy(() => import('../../components/protected/Protected'));

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
