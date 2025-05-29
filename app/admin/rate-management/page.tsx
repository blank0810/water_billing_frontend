'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import RateManagementTable from '@/views/admin/rate-management/rateManagementTable';
import { consumerAllData } from '@/views/data/consumer/consumerDummyData';

export default function RateManagement() {
  return (
    <Box pt={{ base: '150px', md: '100px', xl: '130px' }} px={{ base: 4, md: 6 }}>
      <RateManagementTable tableData={consumerAllData} />
    </Box>
  );
}


