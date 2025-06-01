'use client';
import { Box } from '@chakra-ui/react';

import React from 'react';
import ConsumerManagementTable from '@/views/admin/consumer-management/consumerManagementTable';
import { consumerAllData } from '@/views/data/consumer/consumerDummyData';

export default function ConsumerManagement() {
  return (
    <Box
      pt={{ base: '150px', md: '100px', xl: '130px' }}
      px={{ base: 4, md: 6 }}
    >
      <ConsumerManagementTable tableData={consumerAllData} />
    </Box>
  );
}
