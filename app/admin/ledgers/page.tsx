'use client';
import { Box } from '@chakra-ui/react';
import React from 'react';
import LedgerTable from '@/views/admin/ledgers/ledgers';
import { consumerAllData } from '@/views/data/consumer/consumerDummyData';

export default function Ledgers() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <LedgerTable tableData={consumerAllData} />
    </Box>
  );
}
