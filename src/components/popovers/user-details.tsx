'use client';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiPrinter, FiDownload, FiX } from 'react-icons/fi';
import React from 'react';

export default function UserDetailsPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Dummy user data
  const user = {
    avatarUrl: 'https://bit.ly/broken-link', // Replace with actual avatar URL
    fullName: 'Juan Dela Cruz',
    email: 'juan.delacruz@example.com',
    phone: '+63 912 345 6789',
    address: '123 Barangay Street, Quezon City, Philippines',
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const html = `
        <html>
          <head><title>User Details</title></head>
          <body>
            <h2>User Details</h2>
            <p><strong>Full Name:</strong> ${user.fullName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Address:</strong> ${user.address}</p>
          </body>
        </html>`;
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToCSV = () => {
    const csv = `Full Name,Email,Phone,Address\n"${user.fullName}","${user.email}","${user.phone}","${user.address}"`;
    const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'user_details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button size="sm" colorScheme="purple" onClick={onOpen}>
        View User Details
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={9999}
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(6px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="2xl"
            width="90%"
            maxW="400px"
            position="relative"
          >
            {/* Close Button */}
            <IconButton
              icon={<FiX />}
              aria-label="Close"
              position="absolute"
              top={3}
              right={3}
              size="sm"
              onClick={onClose}
              variant="ghost"
            />

            <Flex direction="column" align="center" mb={4}>
              <Avatar size="xl" name={user.fullName} src={user.avatarUrl} mb={2} />
              <Text fontSize="xl" fontWeight="bold">
                {user.fullName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user.email}
              </Text>
            </Flex>

            <Divider mb={4} />

            <Stack spacing={3}>
              <Box>
                <Text fontWeight="medium">Phone</Text>
                <Text>{user.phone}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Address</Text>
                <Text>{user.address}</Text>
              </Box>
            </Stack>

            <Flex justifyContent="flex-end" gap={3} mt={6}>
              <IconButton
                aria-label="Print"
                icon={<FiPrinter />}
                onClick={handlePrint}
                colorScheme="purple"
                size="sm"
              />
              <IconButton
                aria-label="Export"
                icon={<FiDownload />}
                onClick={exportToCSV}
                colorScheme="blue"
                size="sm"
              />
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
