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
      allowedRoles: ['superAdmin', 'admin','partner'],
    },
    {
      path: '/dashboard/homeForm',
      allowedRoles: ['superAdmin', 'admin','partner'],
    },
    {
      path: '/dashboard/booking',
      allowedRoles: ['superAdmin', 'admin', 'partner'],
    },
    {
      path: '/dashboard/rapport',
      allowedRoles: ['superAdmin', 'admin','partner'],
    },
    {
      path: '/dashboard/ratePlan',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/calendar',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/accessRight',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/user',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/promotion',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/typeChambre',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/politic',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/hotel',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/emailModel',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/generalConditionsOfSale',
      allowedRoles: ['superAdmin','admin','partner'],
    },
    {
      path: '/dashboard/legalNotice',
      allowedRoles: ['superAdmin','admin','partner'],
    },
  ];

  const allowedRoles = paths.filter((section) => section.path === pageSectionPath)[0]?.allowedRoles || [];
  return allowedRoles;
};
