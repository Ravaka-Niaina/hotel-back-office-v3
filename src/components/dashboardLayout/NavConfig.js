// component
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'tableau de bord',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'rapport',
    path: '/dashboard/rapport',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'plan tarifaire',
    path: '/dashboard/ratePlan',
    icon: getIcon('eva:file-text-fill'),
    children: [
      {
        title: 'tarif',
        path: '/dashboard/ratePlan',
      },
      {
        title: 'calendrier',
        path: '/dashboard/calendar',
      },
    ],
  },
  {
    title: "droit d'accès",
    path: '/dashboard/accessRight',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'types de chambre',
    path: '/dashboard/typeChambre',
    icon: getIcon('bxs:hotel'),
  },
  {
    title: 'promotions',
    path: '/dashboard/promotion',
    icon: getIcon('eva:star-fill'),
  },
  {
    title: 'utilisateurs',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
    // children: [

    // ],
  },
  {
    title: 'produits',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'inscription',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
