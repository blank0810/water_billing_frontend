/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  SimpleGrid,
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
  MdChevronRight,
  MdDownload,
  MdRotate90DegreesCcw,
  MdSearch,
} from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Card from '@/components/card/Card';
import { RowObj } from '@/views/data/consumer/consumerData';

const columnHelper = createColumnHelper<RowObj>();

export default function RateManagementTable({ tableData }: { tableData: RowObj[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<RowObj[]>([]);
  const [selectedConsumer, setSelectedConsumer] = useState<RowObj | null>(null);
  const [consumerReadingData, setConsumerReadingData] = useState<RowObj[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  const handleReset = () => {
    setSearchQuery('');
    setFilteredData([]);
    setSelectedConsumer(null);
    setConsumerReadingData([]);
    setDropdownVisible(false);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData([]);
      setDropdownVisible(false);
      return;
    }

    const matches = tableData.filter((consumer) =>
      consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.accountNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (consumer.meterNo ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredData(matches);
    setDropdownVisible(true);
  }, [searchQuery, tableData]);

  const columns = [
    columnHelper.accessor('id', {
      header: () => <Text fontSize="sm" color="gray.500">Consumer ID</Text>,
      cell: (info) => <Text fontWeight="bold" color={textColor}>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('pulledOutReading', {
      header: () => <Text fontSize="sm" color="gray.500">Rate ID</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('rateName', {
      header: () => <Text fontSize="sm" color="gray.500">Rate Name</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('connectionType', {
      header: () => <Text fontSize="sm" color="gray.500">Connection Type</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('billingPeriod', {
      header: () => <Text fontSize="sm" color="gray.500">Billing Period</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('lastRateChangeDate', {
      header: () => <Text fontSize="sm" color="gray.500">Last Rate Change</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('status', {
      header: () => <Text fontSize="sm" color="gray.500">Status</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <Text fontSize="sm" color="gray.500">Details</Text>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          colorScheme="blue"
          size="sm"
          onClick={() =>
            window.location.href = `/admin/rate-management/rateDetails/`
          }
          rightIcon={<MdChevronRight />}
        >
          View
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: consumerReadingData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

 return (
  <Card p={8} bg="white" rounded="2xl" shadow="sm">
    {/* Header */}
    <Flex justify="space-between" mb={10} flexWrap="wrap" gap={6}>
      {/* Search */}
      <Box w="300px" position="relative">
        <InputGroup>
          <Input
            placeholder="Search consumer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setDropdownVisible(true)}
            size="md"
          />
          <InputRightElement>
            <Icon as={MdSearch} color="gray.400" />
          </InputRightElement>
        </InputGroup>

        {dropdownVisible && filteredData.length > 0 && (
          <Box
            position="absolute"
            top="42px"
            w="100%"
            bg="white"
            shadow="md"
            rounded="md"
            zIndex="10"
            maxH="200px"
            overflowY="auto"
          >
            <List spacing={0}>
              {filteredData.map((consumer, i) => (
                <ListItem
                  key={i}
                  px={4}
                  py={2}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedConsumer(consumer);
                    setSearchQuery(consumer.name);
                    setDropdownVisible(false);
                    const rows = tableData.filter(item => item.meterNo === consumer.meterNo);
                    setConsumerReadingData(rows);
                  }}
                >
                  {consumer.name} - {consumer.accountNo}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {/* Buttons */}
      <Flex gap={3}>
        <Button
          size="md"
          variant="outline"
          isDisabled={!selectedConsumer}
          onClick={() => {
            const headers = ['Consumer ID', 'Rate ID', 'Rate Name', 'Connection Type', 'Billing Period', 'Last Rate Change Date', 'Status'];
            const row = [
              selectedConsumer?.id,
              selectedConsumer?.rateId,
              selectedConsumer?.rateName,
              selectedConsumer?.connectionType,
              selectedConsumer?.billingPeriod,
              selectedConsumer?.lastRateChangeDate,
              selectedConsumer?.status,
            ].join(',');
            const csv = [headers.join(','), row].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'consumer_data.csv';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          rightIcon={<MdDownload />}
        >
          Export
        </Button>
        <Button
          size="md"
          variant="outline"
          onClick={handleReset}
          rightIcon={<MdRotate90DegreesCcw />}
        >
          Reset
        </Button>
      </Flex>
    </Flex>

    {/* Consumer Info */}
    <Box p={6} bg="gray.50" rounded="xl" border="1px solid" borderColor={borderColor} mb={10}>
      <Flex gap={6} mb={6}>
        <Avatar size="2xl" name={selectedConsumer?.profile ?? 'Unknown'} />
        <SimpleGrid columns={[1, 2]} spacing={6} flex="1">
          <Box>
            <Text fontSize="sm" color="gray.500">Name</Text>
            <Text fontWeight="semibold" fontSize="md">{selectedConsumer?.name ?? 'No data yet'}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Account No</Text>
            <Text fontWeight="semibold" fontSize="md">{selectedConsumer?.accountNo ?? 'No data yet'}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Meter No</Text>
            <Text fontWeight="semibold" fontSize="md">{selectedConsumer?.meterNo ?? 'No data yet'}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Address</Text>
            <Text fontWeight="semibold" fontSize="md">{selectedConsumer?.address ?? 'No data yet'}</Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>

    {/* Stat Cards */}
    <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={10}>
      {['Bill Amount', 'Rate Charge', 'VAT', 'Penalty'].map((label, idx) => {
        const values = [
          `₱${selectedConsumer?.billAmount?.toFixed(2) ?? '0.00'}`,
          selectedConsumer?.rateCharge ?? 'No data yet',
          selectedConsumer?.vat ?? 'No data yet',
          selectedConsumer?.penalty ?? 'No data yet',
        ];
        return (
          <Box
            key={idx}
            p={5}
            bg="blue.50"
            rounded="md"
            shadow="base"
            transition="all 0.2s ease"
            _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
          >
            <Text fontSize="sm" color="blue.600">{label}</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.800">{values[idx]}</Text>
          </Box>
        );
      })}
    </SimpleGrid>

    {/* Data Table */}
    <Box>
      <Flex align="center" mb={5}>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mr={4}>
          Consumer Current Rates
        </Text>
        <Divider flex={1} />
      </Flex>

      <Table variant="simple" size="sm">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} color="gray.600" fontSize="sm">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Text align="center" color="gray.400">No data yet</Text>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} fontSize="sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  </Card>
);
}