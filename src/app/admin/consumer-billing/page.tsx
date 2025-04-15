'use client';

import React from 'react';

// Chakra imports
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom components

export default function ConsumerBilling() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
     
    </Box>
  );
}
