import { Icon } from '@chakra-ui/react';
import {
  MdDashboard,
  MdPeople,
  MdPersonAdd,
  MdGroup,
  MdPerson,
  MdSpeed,
  MdPriceChange,
  MdRequestQuote,
  MdReceiptLong,
  MdAnalytics,
} from 'react-icons/md';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';

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
    subRoutes: [
      {
        name: 'User List',
        layout: '/admin',
        path: '/user-management',
        icon: <Icon as={HiUserGroup} width="20px" height="20px" color="inherit" />,
      },
      {
        name: 'Add User',
        layout: '/admin',
        path: '/user-management/add-user',
        icon: <Icon as={FaUserPlus} width="20px" height="20px" color="inherit" />,
      },
    ]
  },
  {
    name: 'Consumer Management',
    layout: '/admin',
    path: '/consumer-management',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    subRoutes: [
      {
        name: 'Consumer List',
        layout: '/admin',
        path: '/consumer-management',
        icon: <Icon as={MdGroup} width="20px" height="20px" color="inherit" />,
      },
      {
        name: 'Add Consumer',
        layout: '/admin',
        path: '/consumer-management/add-consumer',
        icon: <Icon as={FaUserCheck} width="20px" height="20px" color="inherit" />,
      },
    ]
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
