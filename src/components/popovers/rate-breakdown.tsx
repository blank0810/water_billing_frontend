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
} from '@chakra-ui/react';
import { FiPrinter, FiDownload, FiX } from 'react-icons/fi';
import React from 'react';

type RateDetail = {
  description: string;
  rate: number;
};

type CenteredPopoverProps = {
  rateBreakdowns: RateDetail[];
};

export default function CenteredPopover({ rateBreakdowns }: CenteredPopoverProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const exportToCSV = () => {
    const csvRows = [
      ['Description', 'Rate'],
      ...rateBreakdowns.map((item) => [item.description, item.rate.toString()]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvRows.map((row) => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'rate_breakdown.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const tableHTML = `
        <html>
          <head><title>Print Breakdown</title></head>
          <body>
            <h2>Rate Breakdown</h2>
            <table border="1" cellpadding="5" cellspacing="0">
              <thead><tr><th>Description</th><th>Rate</th></tr></thead>
              <tbody>
                ${rateBreakdowns
                  .map(
                    (item) =>
                      `<tr><td>${item.description}</td><td>${item.rate}</td></tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </body>
        </html>`;
      printWindow.document.write(tableHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <>
      <Button size="sm" colorScheme="blue" onClick={onOpen}>
        Show Details
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
            maxW="450px"
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

            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Rate Breakdown
            </Text>

            <Table variant="simple" size="sm" mb={4}>
              <Thead>
                <Tr>
                  <Th>Description</Th>
                  <Th isNumeric>Rate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rateBreakdowns.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.description}</Td>
                    <Td isNumeric>{item.rate}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Flex justifyContent="flex-end" gap={3}>
              <IconButton
                aria-label="Print"
                icon={<FiPrinter />}
                onClick={handlePrint}
                colorScheme="blue"
                size="sm"
              />
              <IconButton
                aria-label="Export CSV"
                icon={<FiDownload />}
                onClick={exportToCSV}
                colorScheme="green"
                size="sm"
              />
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
