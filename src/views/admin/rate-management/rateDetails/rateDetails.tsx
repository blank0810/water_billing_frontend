'use client';

import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdSearch, MdCalendarToday, MdDownload, MdPrint } from 'react-icons/md';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { FaPrint, FaDownload } from 'react-icons/fa';

type RateDetail = {
  description: string;
  rate: number;
};

type RowObj = {
  id: number;
  name: string;
  meterNo: string;
  accountNo: string;
  rateName: string;
  vat: string;
  penalty: string;
  period: string;
  startDate: string;
  endDate: string;
  rateBreakdowns: RateDetail[];
};

const dummyData: RowObj[] = [
  {
    id: 1,
    name: 'JANTAN',
    meterNo: '10001',
    accountNo: 'AC001',
    rateName: 'Residential',
    vat: '12%',
    penalty: '5%',
    period: 'Monthly',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    rateBreakdowns: [
      { description: 'Basic Rate', rate: 10 },
      { description: 'Subsidy', rate: -2 },
      { description: 'VAT (12%)', rate: 1.2 },
      { description: 'Penalty (5%)', rate: 0.5 },
    ],
  },
  {
    id: 2,
    name: 'JANTAN',
    meterNo: '10001',
    accountNo: 'AC001',
    rateName: 'Residential',
    vat: '12%',
    penalty: '5%',
    period: 'Monthly',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    rateBreakdowns: [
      { description: 'Basic Rate', rate: 10 },
      { description: 'VAT (12%)', rate: 1.2 },
      { description: 'Penalty (5%)', rate: 0.5 },
    ],
  },
  {
    id: 3,
    name: 'JANTAN',
    meterNo: '10001',
    accountNo: 'AC001',
    rateName: 'Residential',
    vat: '12%',
    penalty: '5%',
    period: 'Monthly',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    rateBreakdowns: [
      { description: 'Basic Rate', rate: 10 },
      { description: 'VAT (12%)', rate: 1.2 },
      { description: 'Penalty (5%)', rate: 0.5 },
    ],
  },
];

const columnHelper = createColumnHelper<RowObj>();

export default function RateDetails() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [openRowId, setOpenRowId] = useState<number | null>(null);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const bgHeader = useColorModeValue('gray.100', 'gray.700');

  const columns = [
    columnHelper.accessor('meterNo', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          Meter No
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('rateName', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          Rate Name
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('vat', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          VAT
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('penalty', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          Penalty
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('period', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          Period
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('startDate', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          Start Date
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('endDate', {
      header: () => (
        <Text fontSize="sm" color="gray.400">
          End Date
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => (
        <Text fontSize="sm" color="gray.400">
          Actions
        </Text>
      ),
      cell: ({ row }) => (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() =>
            setOpenRowId(openRowId === row.original.id ? null : row.original.id)
          }
        >
          {openRowId === row.original.id ? 'Hide Details' : 'Show Details'}
        </Button>
      ),
    }),
  ];

  const filteredData = useMemo(() => {
    return dummyData.filter((row) => {
      const matchQuery = Object.values(row).some(
        (val) =>
          typeof val === 'string' &&
          val.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      const matchDate =
        !selectedDate ||
        (new Date(row.startDate).getMonth() === selectedDate.getMonth() &&
          new Date(row.startDate).getFullYear() === selectedDate.getFullYear());

      return matchQuery && matchDate;
    });
  }, [searchQuery, selectedDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportToCSV = () => {
    const csvContent = [
      [
        'Name',
        'Meter No',
        'Rate Name',
        'VAT',
        'Penalty',
        'Period',
        'Start Date',
        'End Date',
      ],
      ...filteredData.map((row) => [
        row.name,
        row.meterNo,
        row.rateName,
        row.vat,
        row.penalty,
        row.period,
        row.startDate,
        row.endDate,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rate-details.csv';
    link.click();
  };

  return (
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      <Flex
        px="25px"
        py="20px"
        justifyContent="space-between"
        align="center"
        wrap="wrap"
        gap="20px"
      >
        <Text color={textColor} fontSize="20px" fontWeight="600">
          Rate Details - {filteredData[0]?.name}
          <Text fontSize="sm" color="gray.400">
            AccountNo: {filteredData[0]?.accountNo} | MeterNo:{' '}
            {filteredData[0]?.meterNo}
          </Text>
        </Text>
        <Flex align="center" gap="12px" flexWrap="wrap">
          <Flex
            align="center"
            borderRadius="md"
            border="1px solid"
            borderColor={borderColor}
            px="10px"
            py="6px"
            w={{ base: '100%', md: '250px' }}
          >
            <Input
              variant="unstyled"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              _placeholder={{ color: 'gray.400' }}
              color={textColor}
              pr="8px"
            />
            <Icon as={MdSearch} w={5} h={5} color="blue.500" />
          </Flex>
          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            onClick={() => setShowCalendar(!showCalendar)}
            leftIcon={<MdCalendarToday />}
          >
            Date
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            onClick={() => setSelectedDate(null)}
          >
            Reset
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            onClick={exportToCSV}
            leftIcon={<MdDownload />}
            colorScheme="blue"
          >
            Export
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            leftIcon={<MdPrint />}
            onClick={() => window.print()}
          >
            Print
          </Button>
        </Flex>
      </Flex>

      {showCalendar && (
        <Box px="25px" mb="4">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => {
              setSelectedDate(date);
              setShowCalendar(false);
            }}
            inline
            showMonthYearPicker
            dateFormat="MM/yyyy"
          />
        </Box>
      )}

      <Box
        maxW="100%"
        overflowX="auto"
        px="24px"
        pb="24px"
        style={{ maxHeight: '70vh', marginBottom: '20px' }}
      >
        <Table variant="simple" size="md" borderColor="gray.200">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    textTransform="uppercase"
                    fontWeight="bold"
                    fontSize="sm"
                    color="gray.600"
                    py="12px"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <Tr>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>

                {/* Rate Breakdown - Collapsible Row */}
                {openRowId === row.original.id && (
                  <Tr>
                    <Td colSpan={columns.length} p={0} border="none">
                      <Collapse
                        in={openRowId === row.original.id}
                        animateOpacity
                      >
                        <Box
                          bg="gray.50"
                          p={4}
                          mt={2}
                          borderTop="1px solid"
                          borderColor="gray.200"
                          boxShadow="0 -4px 10px rgba(0, 0, 0, 0.05)"
                          borderRadius="md"
                          transition="all 0.3s ease"
                        >
                          <Text fontWeight="bold" mb="2">
                            Period: {row.original.period} | Date:{' '}
                            {row.original.startDate} - {row.original.endDate}
                          </Text>
                          <Table variant="simple" size="sm">
                            <Thead>
                              <Tr>
                                <Th>Rate ID</Th>
                                <Th>Description</Th>
                                <Th>Rate</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {row.original.rateBreakdowns.map(
                                (detail, idx) => (
                                  <Tr key={idx}>
                                    <Td>{idx + 1}</Td>
                                    <Td>{detail.description}</Td>
                                    <Td>{detail.rate}</Td>
                                  </Tr>
                                ),
                              )}
                            </Tbody>
                          </Table>
                          {/* Print and Export Button */}
                          <Box mt="4" textAlign="right">
                            <IconButton
                              icon={<FaPrint />}
                              colorScheme="blue"
                              aria-label="Print"
                              size="sm"
                              mr="4"
                              onClick={() =>
                                console.log('Print action triggered')
                              } // Implement print functionality
                            />
                            <IconButton
                              icon={<FaDownload />}
                              colorScheme="green"
                              aria-label="Export"
                              size="sm"
                              onClick={() =>
                                console.log('Export action triggered')
                              } // Implement export functionality
                            />
                          </Box>
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
