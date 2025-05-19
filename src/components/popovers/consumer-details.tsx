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
  Badge,
} from '@chakra-ui/react';
import { FiPrinter, FiDownload, FiX } from 'react-icons/fi';
import React from 'react';

export default function ConsumerDetailsPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const consumer = {
    avatarUrl: '', // Optional photo URL
    fullName: 'Maria Santos',
    accountNo: 'ACC-2025001',
    meterNo: 'MTR-772199',
    address: 'Purok 5, Brgy. Malinis, San Juan City',
    contact: '+63 917 123 4567',
    status: 'Active',
  };

  const handlePrint = () => {
    const html = `
      <html>
        <head><title>Consumer Details</title></head>
        <body>
          <h2>Consumer Details</h2>
          <p><strong>Full Name:</strong> ${consumer.fullName}</p>
          <p><strong>Account No:</strong> ${consumer.accountNo}</p>
          <p><strong>Meter No:</strong> ${consumer.meterNo}</p>
          <p><strong>Address:</strong> ${consumer.address}</p>
          <p><strong>Contact:</strong> ${consumer.contact}</p>
          <p><strong>Status:</strong> ${consumer.status}</p>
        </body>
      </html>`;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToCSV = () => {
    const csv = `Full Name,Account No,Meter No,Address,Contact,Status\n"${consumer.fullName}","${consumer.accountNo}","${consumer.meterNo}","${consumer.address}","${consumer.contact}","${consumer.status}"`;
    const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'consumer_details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button size="sm" colorScheme="teal" onClick={onOpen}>
        View Consumer Details
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
            maxW="420px"
            position="relative"
          >
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
              <Avatar size="xl" name={consumer.fullName} src={consumer.avatarUrl} mb={2} />
              <Text fontSize="xl" fontWeight="bold">
                {consumer.fullName}
              </Text>
              <Badge colorScheme={consumer.status === 'Active' ? 'green' : 'red'} mt={1}>
                {consumer.status}
              </Badge>
            </Flex>

            <Divider mb={4} />

            <Stack spacing={3}>
              <Box>
                <Text fontWeight="medium">Account No</Text>
                <Text>{consumer.accountNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Meter No</Text>
                <Text>{consumer.meterNo}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Address</Text>
                <Text>{consumer.address}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Contact</Text>
                <Text>{consumer.contact}</Text>
              </Box>
            </Stack>

            <Flex justifyContent="flex-end" gap={3} mt={6}>
              <IconButton
                aria-label="Print"
                icon={<FiPrinter />}
                onClick={handlePrint}
                colorScheme="teal"
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
