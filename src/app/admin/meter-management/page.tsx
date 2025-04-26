'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import MeterManagementTable from 'views/admin/meter-management/meterManagement';
import { consumerAllData } from 'views/data/consumer/consumerDummyData';

export default function MeterManagement() {
  return (
    <Box pt={{ base: '150px', md: '100px', xl: '130px' }} px={{ base: 4, md: 6 }}>
      <MeterManagementTable tableData={consumerAllData} />
    </Box>
  );
}




