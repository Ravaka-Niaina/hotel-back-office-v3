/**
 * @file Allowed Roles
 */
/**
 * @function getAllowedRoles
 * @description A function to get all the allowed roles of each sections and pages of the website
 * @param {string} pageSectionPath
 * @returns {array} Allowed roles
 */
export const getAllowedRoles = (pageSectionPath) => {
  const paths = [
    {
      path: '/dashboard/app',
      allowedRoles: ['*'],
    },
    {
      path: '/dashboard/homeForm',
      allowedRoles: ['*'],
    },
    {
      path: '/dashboard/booking',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/rapport',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/ratePlan',
      allowedRoles: ['superAdmin','admin', 'getListTarif', 'updatePlanTarifaire', 'deletePlanTarifaire', 'insertPlanTarifaire', 'getPlanTarifaire'],
    },
    {
      path: '/dashboard/calendar',
      allowedRoles: ['superAdmin'],
    },
    {
      path: '/dashboard/accessRight',
      allowedRoles: ['superAdmin','admin', 'deleteDroitAcces', 'getListDroitAcces', 'insertDroitAcces', 'updateDroitAcces'],
    },
    {
      path: '/dashboard/user',
      allowedRoles: ['superAdmin','admin', 'deletePartenaire', 'getListPartenaire', 'getPartenaire', 'insertPartenaire', 'updatePartenaire'],
    },
    {
      path: '/dashboard/promotion',
      allowedRoles: ['superAdmin','admin', 'deletePromotion', 'getListPromotion', 'getPromotion', 'insertPromotion', 'updatePromotion'],
    },
    {
      path: '/dashboard/typeChambre',
      allowedRoles: ['superAdmin','admin', 'deleteTypeChambre', 'getListTypeChambre', 'getTypeChambre', 'insertTypeChambre', 'updateTypeChambre'],
    },
    {
      path: '/dashboard/politic',
      allowedRoles: ['superAdmin','admin'],
    },
    {
      path: '/dashboard/hotel',
      allowedRoles: ['*'],
    },
    {
      path: '/dashboard/emailModel',
      allowedRoles: ['superAdmin','admin'],
    },
    {
      path: '/dashboard/historic',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/historic/roomType',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/historic/ratePlan',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/historic/availability',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/historic/promotion',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/historic/politic',
      allowedRoles: ['superAdmin', 'admin'],
    }
  ];

  const allowedRoles = paths.filter((section) => section.path === pageSectionPath)[0]?.allowedRoles || [];
  return allowedRoles;
};
