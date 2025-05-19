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

export default function LedgerSummaryPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const ledgerHTML = `
        <html>
          <head><title>Ledger Summary</title></head>
          <body>
            <h2>Ledger Summary</h2>
            <table border="1" cellpadding="5" cellspacing="0">
              <thead>
                <tr><th>Date</th><th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th></tr>
              </thead>
              <tbody>
                <tr><td>2024-01-01</td><td>Initial Deposit</td><td>₱0.00</td><td>₱1,000.00</td><td>₱1,000.00</td></tr>
                <tr><td>2024-01-10</td><td>Water Bill</td><td>₱350.00</td><td>₱0.00</td><td>₱650.00</td></tr>
              </tbody>
            </table>
          </body>
        </html>`;
      printWindow.document.write(ledgerHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Date,Description,Debit,Credit,Balance',
        '2024-01-01,Initial Deposit,0.00,1000.00,1000.00',
        '2024-01-10,Water Bill,350.00,0.00,650.00'
      ].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ledger_summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button size="sm" colorScheme="teal" onClick={onOpen}>
        Show Ledger Summary
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
            width="95%"
            maxW="650px"
            maxH="90vh"
            overflowY="auto"
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
              Ledger Summary
            </Text>

            <Divider mb={4} />

            <Table variant="striped" size="sm" mb={4}>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th isNumeric>Debit</Th>
                  <Th isNumeric>Credit</Th>
                  <Th isNumeric>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>2024-01-01</Td>
                  <Td>Initial Deposit</Td>
                  <Td isNumeric>₱0.00</Td>
                  <Td isNumeric>₱1,000.00</Td>
                  <Td isNumeric>₱1,000.00</Td>
                </Tr>
                <Tr>
                  <Td>2024-01-10</Td>
                  <Td>Water Bill</Td>
                  <Td isNumeric>₱350.00</Td>
                  <Td isNumeric>₱0.00</Td>
                  <Td isNumeric>₱650.00</Td>
                </Tr>
              </Tbody>
            </Table>

            <Flex justifyContent="flex-end" gap={3}>
              <IconButton
                aria-label="Print Ledger"
                icon={<FiPrinter />}
                onClick={handlePrint}
                colorScheme="teal"
                size="sm"
              />
              <IconButton
                aria-label="Export Ledger"
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
