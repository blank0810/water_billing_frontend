'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import MeterReading from '@/views/admin/meter-management/meterReading/meter-reading';

export default function MeterManagement() {
  return (
    <Box pt={{ base: '150px', md: '100px', xl: '130px' }} px={{ base: 4, md: 6 }}>
        <MeterReading />
    </Box>
  );
}




