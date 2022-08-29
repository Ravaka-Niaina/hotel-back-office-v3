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
    title: 'politique',
    path: '/dashboard/politic',
    icon: getIcon('bxs:shield-alt-2'),
    // children: [

    // ],
  },
  {
    title: 'utilisateurs',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
    // children: [

    // ],
  },
  {
    title: 'Hotel',
    path: '/dashboard/hotel',
    icon: getIcon('bxs:building-house'),
    // children: [

    // ],
  },
  {
    title: "droit d'accès",
    path: '/dashboard/accessRight',
    icon: getIcon('bx:shield-quarter'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },


];

export default navConfig;
