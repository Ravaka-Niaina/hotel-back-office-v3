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
      allowedRoles: ['*'],
    },
    {
      path: '/dashboard/rapport',
      allowedRoles: ['*'],
    },
    {
      path: '/dashboard/ratePlan',
      allowedRoles: ['superAdmin','admin', 'getListTarif', 'updatePlanTarifaire', 'deletePlanTarifaire', 'insertPlanTarifaire', 'getPlanTarifaire'],
    },
    {
      path: '/dashboard/calendar',
      allowedRoles: ['superAdmin','admin'],
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
      allowedRoles: ['*'],
    },
    {
      path: '/dashboard/hotel',
      allowedRoles: ['superAdmin','admin', 'deleteHotel', 'getHotel', 'getListHotel', 'getOneHotel', 'insertHotel', 'updateHotel'],
    },
    {
      path: '/dashboard/emailModel',
      allowedRoles: ['superAdmin','admin'],
    }
  ];

  const allowedRoles = paths.filter((section) => section.path === pageSectionPath)[0]?.allowedRoles || [];
  return allowedRoles;
};
