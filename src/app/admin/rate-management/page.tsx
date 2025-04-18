'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import RateManagementTable from 'views/admin/rate-management/components/rateManagementTable';
import rateManagementData from 'views/admin/rate-management/variables/rateManagementData';

export default function RateManagement() {
  return (
    <Box pt={{ base: '150px', md: '100px', xl: '130px' }} px={{ base: 4, md: 6 }}>
      <RateManagementTable tableData={rateManagementData} />
    </Box>
  );
}
