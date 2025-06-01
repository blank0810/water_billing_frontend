'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import RateTable from '@/views/admin/rate-management/rateDetails/rateDetails';

export default function RateDetails() {

  return (
    <Box pt={{ base: '150px', md: '100px', xl: '130px' }} px={{ base: 4, md: 6 }}>
      <RateTable />
    </Box>
  );
}
