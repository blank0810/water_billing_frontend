import { Icon } from '@chakra-ui/react';
import {
  MdDashboard,
  MdPeople,
  MdAccountCircle,
  MdSpeed,
  MdPriceChange,
  MdRequestQuote,
  MdReceiptLong,
  MdAnalytics,
} from 'react-icons/md';

import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'User Management',
    layout: '/admin',
    path: '/user-management',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Consumer Management',
    layout: '/admin',
    path: '/consumer-management',
    icon: <Icon as={MdAccountCircle} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Rate Management',
    layout: '/admin',
    path: '/rate-management',
    icon: <Icon as={MdPriceChange} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Meter Management',
    layout: '/admin',
    path: '/meter-management',
    icon: <Icon as={MdSpeed} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Consumer Billing',
    layout: '/admin',
    path: '/consumer-billing',
    icon: <Icon as={MdRequestQuote} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Ledgers',
    layout: '/admin',
    path: '/ledgers',
    icon: <Icon as={MdReceiptLong} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Analytics',
    layout: '/admin',
    path: '/analytics',
    icon: <Icon as={MdAnalytics} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
