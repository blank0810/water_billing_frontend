'use client';
import { Box } from '@chakra-ui/react';

import React from 'react';
import ConsumerManagementTable from 'views/admin/consumer-management/components/consumerManagementTable';
import consumerManagementData from 'views/admin/consumer-management/variables/consumerManagementData';

export default function ConsumerManagement() {
  return (
    <Box
      pt={{ base: '150px', md: '100px', xl: '130px' }}
      px={{ base: 4, md: 6 }}
    >
      <ConsumerManagementTable tableData={consumerManagementData} />
    </Box>
  );
}
