// component
import jwtDecode from 'jwt-decode';
import { getPayloadFromToken, getUserDetailsById, checkAuthWithRole } from '../../services/User';
import { getAllowedRoles } from '../../services/AllowedRoles';
import Iconify from '../Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
/**
 * @function getNavConfig
 * @description A function to get all the items to be displayed on the sidebar referring to the user roles
 * @param {string} idToken The jwt token of the user
 * @returns {array} An array of all the items of the navigation bar
 */
export const getNavConfig = async (idToken) => {
  const payloadFromToken = getPayloadFromToken(jwtDecode, idToken);
  const partnerId = payloadFromToken?.partner_id;
  const userDetails = await getUserDetailsById(partnerId);
  const userAccessRights = userDetails.data?.atribAR;
  const userRoles = userAccessRights.map((accessRight) => accessRight?._id);
  const navConfig = [
    {
      title: 'tableau de bord',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
      userIsAllowed: getAllowedRoles('/dashboard/app'),
      isAuthorized: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/app')),
    },
    {
      title: 'rapport',
      path: '/dashboard/rapport',
      icon: getIcon('eva:pie-chart-2-fill'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/rapport')),
    },
    {
      title: 'plan tarifaire',
      path: '/dashboard/ratePlan',
      icon: getIcon('eva:file-text-fill'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/ratePlan')),
      children: [
        {
          title: 'tarif',
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
      title: 'politique',
      path: '/dashboard/politic',
      icon: getIcon('bxs:shield-alt-2'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/politic')),
      // children: [

      // ],
    },
    {
      title: 'utilisateurs',
      path: '/dashboard/user',
      icon: getIcon('eva:people-fill'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/user')),
    },
    {
      title: 'Hotels',
      path: '/dashboard/hotel',
      icon: getIcon('bxs:building-house'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/hotel')),
    },
    {
      title: "droit d'accès",
      path: '/dashboard/accessRight',
      icon: getIcon('bx:shield-quarter'),
      userIsAllowed: checkAuthWithRole(userRoles, getAllowedRoles('/dashboard/accessRight')),
    },
    {
      title: 'login',
      path: '/login',
      icon: getIcon('eva:lock-fill'),
    },
  ];
  return navConfig;
};
