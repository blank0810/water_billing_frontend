'use client';
import { Box } from '@chakra-ui/react';

import React from 'react';
import UserManagementTable from 'views/admin/user-management/components/userManagementTable';
import userManagementData from 'views/admin/user-management/variables/userManagementData';


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
