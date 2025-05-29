'use client';
import React from 'react';

// Chakra imports
import { Box } from '@chakra-ui/react';

import ConsumerForm from '@/views/admin/consumer-management/consumerPage/consumerForm';

// Dummy data
export default function AddConsumer() {
  return (
    <Box pt={{ base: '100px', md: '80px', xl: '80px' }}>
        <ConsumerForm />
    </Box>
  );
}
