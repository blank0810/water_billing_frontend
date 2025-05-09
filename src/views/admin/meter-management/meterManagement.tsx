/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
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
  Avatar,
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
import Card from 'components/card/Card';
import { RowObj } from 'views/data/consumer/consumerData';

const columnHelper = createColumnHelper<RowObj>();

export default function MeterManagementTable({ tableData }: { tableData: RowObj[] }) {
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
      consumer.accountNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.meterNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredData(matches);
    setDropdownVisible(true);
  }, [searchQuery, tableData]);

  const columns = [
    columnHelper.accessor('id', {
      header: () => <Text fontSize="sm" color="gray.500">ID</Text>,
      cell: (info) => <Text fontWeight="bold" color={textColor}>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('installedReading', {
      header: () => <Text fontSize="sm" color="gray.500">Installed Reading</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('pulledOutReading', {
      header: () => <Text fontSize="sm" color="gray.500">Pulled-Out Reading</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('date', {
      header: () => <Text fontSize="sm" color="gray.500">Install Date</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('meterNo', {
      header: () => <Text fontSize="sm" color="gray.500">Meter No</Text>,
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
            window.location.href = `/admin/meter-management/meter-reading/${row.original.meterNo}`
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
    <Card p="6">
      <Flex justify="space-between" mb="6">
        {/* Search Box */}
        <Box w="300px" position="relative">
          <InputGroup>
            <Input
              placeholder="Search consumer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setDropdownVisible(true)}
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
            size="sm"
            variant="outline"
            isDisabled={!selectedConsumer}
            onClick={() => {
              const headers = ['ID', 'Installed', 'Pulled-Out', 'Date', 'Meter No', 'Account No', 'Status'];
              const row = [
                selectedConsumer?.id,
                selectedConsumer?.installedReading,
                selectedConsumer?.pulledOutReading,
                selectedConsumer?.date,
                selectedConsumer?.meterNo,
                selectedConsumer?.accountNo,
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

          <Button size="sm" variant="outline" onClick={handleReset} rightIcon={<MdRotate90DegreesCcw />}>
            Reset
          </Button>
        </Flex>
      </Flex>

      {/* Consumer Info & Table */}
      <Box p={6} bg="gray.50" rounded="2xl" border="1px solid" borderColor={borderColor}>
        {!selectedConsumer ? (
          <Text align="center" color="gray.500">No consumer selected</Text>
        ) : (
          <>
            <Grid templateColumns={['1fr', '25% 75%']} gap="6" mb="6">
              <Flex justify="center" align="center">
                <Avatar size="2xl" name={selectedConsumer.name} />
              </Flex>
              <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap="4">
                <Box>
                  <Text fontSize="sm" color="gray.500">Consumer</Text>
                  <Text fontSize="lg" fontWeight="bold">{selectedConsumer.name}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">Account No</Text>
                  <Text fontSize="lg" fontWeight="bold">{selectedConsumer.accountNo}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">Address</Text>
                  <Text>{selectedConsumer.address}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">Contact</Text>
                  <Text>{selectedConsumer.contact}</Text>
                </Box>
              </Grid>
            </Grid>

            <Divider my="6" />

            <SimpleGrid columns={[1, 3]} spacing="4">
              <Box bg="white" p="4" shadow="sm" rounded="md">
                <Text fontSize="sm" color="gray.500">Bill Amount</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  ₱{selectedConsumer.billAmount?.toFixed(2) ?? '0.00'}
                </Text>
              </Box>
              <Box bg="white" p="4" shadow="sm" rounded="md">
                <Text fontSize="sm" color="gray.500">Consumption</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {selectedConsumer.consumption ?? '0'} m³
                </Text>
              </Box>
              <Box bg="white" p="4" shadow="sm" rounded="md">
                <Text fontSize="sm" color="gray.500">Status</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {selectedConsumer.status ?? 'Unknown'}
                </Text>
              </Box>
            </SimpleGrid>

            <Flex align="center" my="6">
  <Text fontSize="xl" fontWeight="bold" mr="">
    Meter
  </Text>
  <Divider />
</Flex>


            {/* Table */}
            <Table variant="simple" size="sm">
              <Thead>
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
          </>
        )}
      </Box>
    </Card>
  );
}
