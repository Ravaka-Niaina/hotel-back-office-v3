import React from 'react';
// component
import {  checkAuthWithRole } from '../../services/User';
import { getAllowedRoles } from '../../services/AllowedRoles';
// import NotificationBadge from '../reservation/NotificationBadge';
import Iconify from '../Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/**
 * @function getSidebarConfig
 * @description A function to get all the items to be displayed on the sidebar referring to the user roles
 * @param {hook} context A context from ThemeContext
 * @returns {array} An array of all the items of the navigation bar
 */
export const getSidebarConfig = async (context) => {
  const userDetails = await context.getUserDetails();
  // console.log(userDetails)
  const userAccessRights = userDetails.data.atribAR;
  const userRoles = userAccessRights.map((accessRight) => accessRight?._id);
  const sidebarConfig = [
    {
      title: 'tableau de bord',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
      userIsAllowed: getAllowedRoles('/dashboard/app'),
      isAuthorized: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/app')),
    },
    {
      title: 'Hotels',
      path: '/dashboard/createOrDeleteHotel',
      icon: getIcon('bxs:building-house'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/hotel')),
      children: [
        {
          title: 'Modifier hôtel',
          path: '/dashboard/updateHotel',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/hotel')),
        },
        {
          title: 'Choisir hôtel à gérer',
          path: '/chooseHotelToManage/',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/hotel')),
        }
      ]
    },
    {
      title: 'rapports',
      path: '/dashboard/rapport',
      icon: getIcon('wpf:statistics'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/rapport')),
    },
    {
      title: 'reservations',
      path: '/dashboard/booking',
      icon: getIcon('teenyicons:appointments-solid'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/booking')),
      // notificationComponent:(<NotificationBadge />),
    },
    {
      title: 'plans tarifaires',
      path: '/dashboard/ratePlan',
      icon: getIcon('eva:file-text-fill'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/ratePlan'))
        || checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/calendar')),
      children: [
        {
          title: 'tarifs',
          path: '/dashboard/ratePlan',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/ratePlan')),
        },
        {
          title: 'calendrier',
          path: '/dashboard/calendar',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/calendar')),
        },
      ],
    },
    {
      title: 'types de chambre',
      path: '/dashboard/typeChambre',
      icon: getIcon('bxs:hotel'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/typeChambre')),
    },
    {
      title: 'promotions',
      path: '/dashboard/promotion',
      icon: getIcon('eva:star-fill'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/promotion')),
    },
    {
      title: 'politiques',
      path: '/dashboard/politic',
      icon: getIcon('bxs:shield-alt-2'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/politic')),
    },
    {
      title: 'utilisateurs',
      path: '/dashboard/user',
      icon: getIcon('eva:people-fill'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/user')),
    },
    {
      title: "modèle email",
      path: '/dashboard/emailModel',
      icon: getIcon('bx:mail-send'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/emailModel')),
    },
    {
      title: 'Historique modifications',
      path: '/dashboard/historic',
      icon: getIcon('material-symbols:menu-book-rounded'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/historic')),
      children: [
        {
          title: 'Type chambre',
          path: '/dashboard/historic/roomType',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/historic/roomType')),
        },
        {
          title: 'Plan tarifaire',
          path: '/dashboard/historic/ratePlan',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/historic/ratePlan')),
        },
        {
          title: 'Disponibilité',
          path: '/dashboard/historic/availability',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/historic/ratePlan')),
        },
        {
          title: 'Promotion',
          path: '/dashboard/historic/promotion',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/historic/promotion')),
        },
        {
          title: 'Politique d\'annulation',
          path: '/dashboard/historic/politic',
          userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/historic/politic')),
        }
      ]
    },
    {
      title: 'login',
      path: '/login',
      icon: getIcon('eva:lock-fill'),
    },
  ];
  return sidebarConfig;
};
