export const getAllowedRoles = (pageSectionPath) => {
  const paths = [
    {
      path: '/dashboard/app',
      allowedRoles: ['superAdmin', 'admin','partner'],
    },
    {
      path: '/dashboard/homeForm',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/rapport',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/ratePlan',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/calendar',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/accessRight',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/user',
      allowedRoles: ['superAdmin', 'admin'],
    },
    {
      path: '/dashboard/promotion',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/typeChambre',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/politic',
      allowedRoles: ['olona'],
    },
    {
      path: '/dashboard/hotel',
      allowedRoles: ['olona'],
    },
  ];

  const allowedRoles = paths.filter((section) => section.path === pageSectionPath)[0]?.allowedRoles || [];
  return allowedRoles;
};
