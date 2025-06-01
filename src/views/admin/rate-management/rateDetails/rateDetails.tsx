'use client';

import {
  Box,
  Button,
  Flex,
  Icon,
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
import {
  MdSearch,
  MdCalendarToday,
  MdDownload,
  MdPrint,
} from 'react-icons/md';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import Card from '@/components/card/Card';
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import RateBreakdownModal from '@/components/modals/rateBreakdownModal';

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
];

const columnHelper = createColumnHelper<RowObj>();

function exportToCSV(data: RowObj[]) {
  const csvRows: string[] = [];
  const headers = [
    'Meter No',
    'Rate Name',
    'VAT',
    'Penalty',
    'Period',
    'Start Date',
    'End Date',
  ];
  csvRows.push(headers.join(','));

  data.forEach(row => {
    csvRows.push([
      row.meterNo,
      row.rateName,
      row.vat,
      row.penalty,
      row.period,
      row.startDate,
      row.endDate,
    ].join(','));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'rate_details.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function RateDetails() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<RateDetail[]>([]);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const bgHeader = useColorModeValue('gray.100', 'gray.700');

  const columns = [
    columnHelper.accessor('meterNo', {
      header: () => <Text fontSize="sm" color="gray.400">Meter No</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('rateName', {
      header: () => <Text fontSize="sm" color="gray.400">Rate Name</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('vat', {
      header: () => <Text fontSize="sm" color="gray.400">VAT</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('penalty', {
      header: () => <Text fontSize="sm" color="gray.400">Penalty</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('period', {
      header: () => <Text fontSize="sm" color="gray.400">Period</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('startDate', {
      header: () => <Text fontSize="sm" color="gray.400">Start Date</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('endDate', {
      header: () => <Text fontSize="sm" color="gray.400">End Date</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <Text fontSize="sm" color="gray.400">Actions</Text>,
      cell: ({ row }) => (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => {
            setModalData(row.original.rateBreakdowns);
            setIsModalOpen(true);
          }}
        >
          Show Details
        </Button>
      ),
    }),
  ];

  const filteredData = useMemo(() => {
    return dummyData.filter((row) => {
      const matchQuery = Object.values(row).some(
        (val) =>
          typeof val === 'string' &&
          val.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <Card w="100%" h="100%" px="0px" overflow="hidden">
      <Flex px="25px" py="20px" justifyContent="space-between" align="center" wrap="wrap" gap="20px">
        <Text color={textColor} fontSize="20px" fontWeight="600">
          Rate Details - {filteredData[0]?.name || 'N/A'}
          <Text fontSize="sm" color="gray.400">
            AccountNo: {filteredData[0]?.accountNo || 'N/A'} | MeterNo: {filteredData[0]?.meterNo || 'N/A'}
          </Text>
        </Text>
        <Flex align="center" gap="12px" wrap="wrap">
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
          <Button size="sm" variant="outline" onClick={() => setShowCalendar(!showCalendar)} leftIcon={<MdCalendarToday />}>
            Date
          </Button>
          <Button size="sm" variant="outline" onClick={() => setSelectedDate(null)}>
            Reset
          </Button>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<MdDownload />}
            onClick={() => exportToCSV(filteredData)}
            colorScheme="blue"
          >
            Export
          </Button>
          <Button size="sm" variant="outline" leftIcon={<MdPrint />} onClick={() => window.print()}>
            Print
          </Button>
        </Flex>
      </Flex>

      {showCalendar && (
        <Box px="25px" mb="4">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              setShowCalendar(false);
            }}
            inline
            showMonthYearPicker
            dateFormat="MM/yyyy"
          />
        </Box>
      )}

      <Box maxW="100%" overflowX="auto" px="24px" pb="24px">
        <Table variant="simple" size="md">
          <Thead bg={bgHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <RateBreakdownModal
        rateBreakdowns={modalData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
