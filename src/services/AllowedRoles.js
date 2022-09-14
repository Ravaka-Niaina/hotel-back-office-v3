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
      path: '/dashboard/rapport',
      allowedRoles: ['superAdmin', 'admin','partner'],
    },
    {
      path: '/dashboard/ratePlan',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/calendar',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/accessRight',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/user',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/promotion',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/typeChambre',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/politic',
      allowedRoles: ['admin','partner'],
    },
    {
      path: '/dashboard/hotel',
      allowedRoles: ['superAdmin','admin','partner'],
    },
  ];

  const allowedRoles = paths.filter((section) => section.path === pageSectionPath)[0]?.allowedRoles || [];
  return allowedRoles;
};
