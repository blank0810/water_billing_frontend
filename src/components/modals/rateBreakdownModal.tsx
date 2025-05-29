'use client';

import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
} from '@chakra-ui/react';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import React from 'react';

type RateDetail = {
  description: string;
  rate: number;
};

type RateBreakdownModalProps = {
  rateBreakdowns: RateDetail[];
  isOpen: boolean;
  onClose: () => void;
};

export default function RateBreakdownModal({
  rateBreakdowns,
  isOpen,
  onClose,
}: RateBreakdownModalProps) {
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
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent bg="white"> {/* 👈 Ensures background is white */}
        <ModalHeader>Rate Breakdown</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th isNumeric>Rate</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rateBreakdowns.map((item, idx) => (
                <Tr key={idx}>
                  <Td>{item.description}</Td>
                  <Td isNumeric>{item.rate}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Flex gap={3}>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
