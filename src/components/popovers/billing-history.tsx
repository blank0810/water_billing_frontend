'use client';

import {
  IconButton,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useDisclosure,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import { FiPrinter, FiDownload, FiX } from 'react-icons/fi';
import React from 'react';

export default function BillingSummaryPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const summaryHTML = `
        <html>
          <head><title>Billing Summary</title></head>
          <body>
            <h2>Billing Summary</h2>
            <table border="1" cellpadding="5" cellspacing="0">
              <thead>
                <tr><th>Item</th><th>Amount</th></tr>
              </thead>
              <tbody>
                <tr><td>Previous Balance</td><td>₱1,000.00</td></tr>
                <tr><td>Current Charges</td><td>₱500.00</td></tr>
                <tr><td>Late Fees</td><td>₱50.00</td></tr>
                <tr><td><strong>Total</strong></td><td><strong>₱1,550.00</strong></td></tr>
              </tbody>
            </table>
          </body>
        </html>`;
      printWindow.document.write(summaryHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Item,Amount', 'Previous Balance,1000.00', 'Current Charges,500.00', 'Late Fees,50.00', 'Total,1550.00'].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'billing_summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button size="sm" colorScheme="purple" onClick={onOpen}>
        Show Billing Summary
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

            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Billing Summary
            </Text>

            <Divider mb={4} />

            <Table variant="simple" size="sm" mb={4}>
              <Tbody>
                <Tr>
                  <Td>Previous Balance</Td>
                  <Td isNumeric>₱1,000.00</Td>
                </Tr>
                <Tr>
                  <Td>Current Charges</Td>
                  <Td isNumeric>₱500.00</Td>
                </Tr>
                <Tr>
                  <Td>Late Fees</Td>
                  <Td isNumeric>₱50.00</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Total</Td>
                  <Td isNumeric fontWeight="bold">₱1,550.00</Td>
                </Tr>
              </Tbody>
            </Table>

            <Flex justifyContent="flex-end" gap={3}>
              <IconButton
                aria-label="Print Billing"
                icon={<FiPrinter />}
                onClick={handlePrint}
                colorScheme="purple"
                size="sm"
              />
              <IconButton
                aria-label="Export Billing"
                icon={<FiDownload />}
                onClick={exportToCSV}
                colorScheme="teal"
                size="sm"
              />
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
