'use client';
import React from 'react';

// Chakra imports
import { Box } from '@chakra-ui/react';

// Custom components
import ConsumerBillingTable from '@/views/admin/consumer-billing/consumerBillingTable';
import { consumerAllData } from '@/views/data/consumer/consumerDummyData';

// Dummy data
export default function ConsumerBilling() {
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <ConsumerBillingTable tableData={consumerAllData} />
    </Box>
  );
}
