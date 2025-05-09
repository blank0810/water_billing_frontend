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
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';

type RowObj = {
  id: number;
  name: string;
  meterNo: string;
  date: string;
  accountNo: string;
  previousReading: string;
  presentReading: string;
};

const dummyData: RowObj[] = [
  {
    id: 1,
    name: 'JANTAN',
    meterNo: '10001',
    accountNo: 'AC001',
    date: '2023-10-01',
    previousReading: '100',
    presentReading: '200',
  },
  {
    id: 2,
    name: 'JANTAN',
    meterNo: '10001',
    accountNo: 'AC001',
    date: '2023-10-01',
    previousReading: '100',
    presentReading: '200',
  },
  {
    id: 3,
    name: 'JANTAN',
    meterNo: '10001',
    accountNo: 'AC001',
    date: '2023-10-01',
    presentReading: '100',
    previousReading: '200',
  },
];

const columnHelper = createColumnHelper<RowObj>();

export default function MeterReading() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [openRowId, setOpenRowId] = useState<number | null>(null);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const bgHeader = useColorModeValue('gray.100', 'gray.700');

  const columns = [
    columnHelper.accessor('meterNo', {
      header: () => <Text fontSize="sm" color="gray.400">Meter No</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('presentReading', {
      header: () => <Text fontSize="sm" color="gray.400">Present Reading</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('previousReading', {
      header: () => <Text fontSize="sm" color="gray.400">Previous Reading</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('date', {
      header: () => <Text fontSize="sm" color="gray.400">Date</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <Text fontSize="sm" color="gray.400">Actions</Text>,
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
          val.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const matchDate =
        !selectedDate ||
        (new Date(row.date).getMonth() === selectedDate.getMonth() &&
          new Date(row.date).getFullYear() === selectedDate.getFullYear());

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
      ['Name', 'Meter No', 'Present Reading', 'Previous Reading', 'Date'],
      ...filteredData.map((row) => [
        row.name,
        row.meterNo,
        row.presentReading,
        row.previousReading,
        row.date,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'meter-reading.csv';
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
          Meter Reading - {filteredData[0]?.name || 'N/A'}
          <Text fontSize="sm" color="gray.400">
            AccountNo: {filteredData[0]?.accountNo || 'N/A'} | MeterNo:{' '}
            {filteredData[0]?.meterNo || 'N/A'}
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

      {/* ✅ TABLE DISPLAY */}
      <Box overflowX="auto" px="25px" pb="20px">
        <Table variant="simple" colorScheme="gray">
          <Thead bg={bgHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder ? null : header.column.columnDef.header?.()}
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
                    <Td key={cell.id}>{cell.column.columnDef.cell?.({ getValue: cell.getValue, row })}</Td>
                  ))}
                </Tr>
                {openRowId === row.original.id && (
                  <Tr>
                    <Td colSpan={columns.length}>
                      <Text fontSize="sm" color="gray.500">
                        Extra details for meter #{row.original.meterNo} can go here.
                      </Text>
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
