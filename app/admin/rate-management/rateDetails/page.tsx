'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import RateTable from '@/views/admin/rate-management/rateDetails/rateDetails';

export default function RateDetails() {

  return (
    <Box pt={{ base: '32px', md: '24px', xl: '24px' }} px={{ base: 4, md: 6 }}>
      <RateTable />
    </Box>
  );
}
