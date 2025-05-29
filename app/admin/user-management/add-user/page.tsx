'use client';
import React from 'react';

// Chakra imports
import { Box } from '@chakra-ui/react';
import UserForm from '@/views/admin/user-management/add-user-page/userForm';



// Dummy data
export default function AddConsumer() {
  return (
    <Box pt={{ base: '32px', md: '24px', xl: '24px' }}>
        <UserForm />
    </Box>
  );
}
