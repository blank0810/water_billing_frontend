/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Divider,
  Avatar,
  InputGroup,
  Input,
  InputRightElement,
  Grid,
  List,
  ListItem,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import {
  MdDownload,
  MdSearch,
  MdChevronRight,
  MdRotate90DegreesCcw,
} from 'react-icons/md';
import * as React from 'react';
import { RowObj } from 'views/data/consumer/consumerData';

const columnHelper = createColumnHelper<RowObj>();

export default function MeterManagementTable({
  tableData,
}: {
  tableData: RowObj[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<RowObj[]>([]);
  const [selectedConsumer, setSelectedConsumer] = React.useState<RowObj | null>(null);
  const [consumerReadingData, setConsumerReadingData] = React.useState<RowObj[]>([]);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const handleReset = () => {
    setSearchQuery('');
    setFilteredData([]);
    setSelectedConsumer(null);
    setConsumerReadingData([]);
    setDropdownVisible(false);
  };

  React.useEffect(() => {
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
      header: () => <Text fontSize="sm" color="gray.400">ID</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('installedReading', {
      header: () => <Text fontSize="sm" color="gray.400">INSTALLED READING</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('pulledOutReading', {
      header: () => <Text fontSize="sm" color="gray.400">PULLED-OUT READING</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('date', {
      header: () => <Text fontSize="sm" color="gray.400">INSTALL DATE</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('meterNo', {
      header: () => <Text fontSize="sm" color="gray.400">METER NO</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('status', {
      header: () => <Text fontSize="sm" color="gray.400">STATUS</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <Text fontSize="sm" color="gray.400">Details</Text>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          colorScheme="blue"
          onClick={() => {
            window.location.href = `/admin/meter-management/meter-reading/${row.original.meterNo}`;
          }}
          rightIcon={<MdChevronRight />}
          size="sm"
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
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      <Flex justifyContent="space-between" px="25px" pt="20px">
        <Box position="relative" w="300px">
          <InputGroup>
            <Input
              placeholder="Search consumer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setDropdownVisible(true)}
              color='#1B254B'
            />
            <InputRightElement>
              <Icon as={MdSearch} color="gray.400" />
            </InputRightElement>
          </InputGroup>

          {dropdownVisible && filteredData.length > 0 && (
            <Box
              position="absolute"
              top="42px"
              width="100%"
              bg="white"
              boxShadow="md"
              borderRadius="md"
              zIndex="10"
              maxHeight="200px"
              overflowY="auto"
            >
              <List spacing={1}>
                {filteredData.map((consumer, index) => (
                  <ListItem
                    key={index}
                    px={3}
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
                    <Text fontSize="sm">{consumer.name} - {consumer.accountNo}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>

        <Flex gap={2}>
          <Button
            variant="outline"
            size="sm"
            isDisabled={!selectedConsumer}
            onClick={() => {
              const headers = ['ID', 'Installed Reading', 'Pulled-out Reading', 'Install Date', 'Meter No', 'Account No', 'Status'];
              const csvRows = [
                headers.join(','),
                [
                  selectedConsumer?.id,
                  selectedConsumer?.installedReading,
                  selectedConsumer?.pulledOutReading,
                  selectedConsumer?.date,
                  selectedConsumer?.meterNo,
                  selectedConsumer?.accountNo,
                  selectedConsumer?.status
                ].join(','),
              ];
              const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'consumer_data.csv';
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            rightIcon={<MdDownload size={16} />}
          >
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            rightIcon={<MdRotate90DegreesCcw size={16} />}
          >
            Reset
          </Button>
        </Flex>
      </Flex>

      <Box
  mt="6"
  mx="25px"
  p="8"
  bg={useColorModeValue('white', '#1B254B')}
  borderRadius="2xl"
  boxShadow="sm"
  border="1px solid"
  borderColor={borderColor}
>
  {!selectedConsumer ? (
    <Text fontSize="lg" color="gray.400" textAlign="center">
      No consumer selected
    </Text>
  ) : (
    <>
      {/* Top Section */}
      <Grid templateColumns={['1fr', '25% 75%']} gap="6" mb="6">
        <Flex justify="center" align="center">
          <Avatar size="2xl" name={selectedConsumer.name} />
        </Flex>
        <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap="6">
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Consumer Name</Text>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">{selectedConsumer.name}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Account No</Text>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">{selectedConsumer.accountNo}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Address</Text>
            <Text fontSize="lg" color="gray.600">{selectedConsumer.address}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Contact</Text>
            <Text fontSize="lg" color="gray.600">{selectedConsumer.contact}</Text>
          </Box>
        </Grid>
      </Grid>

      <Divider my="6" borderColor={borderColor} />

      <SimpleGrid columns={[1, 3]} spacing="6">
        <Flex
          p="4"
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderRadius="lg"
          align="center"
          justify="space-between"
        >
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">Bill Amount</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              ₱{selectedConsumer.billAmount?.toFixed(2) ?? '0.00'}
            </Text>
          </Box>
        </Flex>

        <Flex
          p="4"
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderRadius="lg"
          align="center"
          justify="space-between"
        >
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">Consumption</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {selectedConsumer.consumption ?? '0'} cu.m
            </Text>
          </Box>
        </Flex>

        <Flex
          p="4"
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderRadius="lg"
          align="center"
          justify="space-between"
        >
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">VAT</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              ₱{selectedConsumer.vat ?? '0.00'}
            </Text>
          </Box>
        </Flex>
      </SimpleGrid>
    </>
  )}
</Box>


      <Box px="25px" py="4">
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Th>
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
    </Card>
  );
}
