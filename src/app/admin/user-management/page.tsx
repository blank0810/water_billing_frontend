'use client';
import { Box } from '@chakra-ui/react';

import React from 'react';
import UserManagementTable from 'views/admin/user-management/userManagementTable';
import userManagementData from 'views/data/user/userDummyData';


export default function UserManagement() {
  return (
    <Box
      pt={{ base: '150px', md: '100px', xl: '130px' }}
      px={{ base: 4, md: 6 }}
    >
      <UserManagementTable tableData={userManagementData} />
    </Box>
  );
}
 