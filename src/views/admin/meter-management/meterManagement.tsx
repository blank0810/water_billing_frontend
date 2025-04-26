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
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdSort,
  MdChevronLeft,
  MdChevronRight,
  MdVisibility,
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
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // State to store the current search query
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<RowObj[]>(tableData);

  // Filter the data based on the search query
  React.useEffect(() => {
    const filtered = tableData.filter((consumer) =>
      consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.accountNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.meterNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, tableData]);

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => <Text fontSize="sm" color="gray.400">ID</Text>,
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('presentReading', {
      id: 'presentReading',
      header: () => <Text fontSize="sm" color="gray.400">PRESENT READING</Text>,
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => <Text fontSize="sm" color="gray.400">DATE</Text>,
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('meterNo', {
      id: 'meterNo',
      header: () => <Text fontSize="sm" color="gray.400">METER NO</Text>,
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('accountNo', {
      id: 'accountNo',
      header: () => <Text fontSize="sm" color="gray.400">ACCOUNT NO</Text>,
      cell: (info) => (
        <Text color={textColor} fontSize="sm">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.display({
      id: 'action',
      header: () => (
        <Text fontSize="sm" color="gray.400">
          ACTION
        </Text>
      ),
      cell: ({ row }) => (
        <Box as="button" onClick={() => setFilteredData([row.original])}> {/* Update data to only this consumer */}
          <Icon
            as={MdChevronRight}
            w={6}
            h={6}
            color="gray.600"
            _hover={{ color: 'gray.800' }}
          />
        </Box>
      ),
    }),    
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(filteredData.length / 10),
  });

  React.useEffect(() => {
    table.setPageSize(10);
  }, [table]);

  return (
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      <Flex justifyContent="flex-end" px="25px" pt="20px">
        <InputGroup maxW="300px">
          <Input
            placeholder="Search consumer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  // Update search query on input change
          />
          <InputRightElement>
            <Icon as={MdSearch} color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </Flex>

      {filteredData[0] && ( // Ensure filtered data is available
        <Box
          mt="4"
          mx="25px"
          p="6"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue('gray.100', 'gray.700')}
          position="relative"
          boxShadow="md"
        >
          <Grid templateColumns="20% 40% 40%" gap="6" mb="4">
            {/* Avatar Column */}
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar size="xl" name={filteredData[0].name} />
            </Box>

            {/* Name and Address Column */}
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Consumer Name:
              </Text>
              <Text fontSize="lg" color={textColor}>
                {filteredData[0].name}
              </Text>
              <Box mt="2"> 
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  Address:
                </Text>
                <Text fontSize="lg" color={textColor}>
                  {filteredData[0].address}
                </Text>
              </Box>
            </Box>

            {/* Account No and Contact Column */}
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Account No:
              </Text>
              <Text fontSize="lg" color={textColor}>
                {filteredData[0].accountNo}
              </Text>
              <Box mt="2"> 
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  Contact:
                </Text>
                <Text fontSize="lg" color={textColor}>
                  {filteredData[0].contact}
                </Text>
              </Box>
            </Box>
          </Grid>

          <Divider my="4" borderColor={borderColor} />

          {/* Bill, Consumption, VAT */}
          <Grid templateColumns="33% 34% 33%" gap="4" mx="20" alignItems="center">
            <Box display="flex" alignItems="center" gap="4">
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                Bill Amount:
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                ₱{filteredData[0].billAmount.toFixed(2)}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="4" justifyContent="center">
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                Consumption:
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {filteredData[0].consumption} cu.m
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="4" justifyContent="flex-end">
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                VAT:
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                ₱{filteredData[0].vat}
              </Text>
            </Box>
          </Grid>

          <Divider my="4" borderColor={borderColor} /> 

          {/* View Consumer Profile Button */}
          <Box mt="4" display="flex" justifyContent="flex-end">
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<Icon as={MdVisibility} />}
              colorScheme="blue"
            >
              View Consumer Profile
            </Button>
          </Box>
        </Box>
      )}

      <Flex
        px="25px"
        py="20px"
        justifyContent="space-between"
        align="center"
        direction={{ base: 'column', md: 'row' }}
      >
        <Text color={textColor} fontSize="20px" fontWeight="600">
          Consumer Meter
        </Text>
      </Flex>

      <Box maxW="100%" overflowX="auto" overflowY="auto" px="20px" pb="20px" style={{ maxHeight: '70vh' }}>
        <Table variant="simple" color="gray.500" minW="1000px">
          <Thead position="sticky" top={0} bg={useColorModeValue('gray.100', 'gray.700')} zIndex={1}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex justifyContent="space-between" align="center" fontSize="sm" color="gray.400">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize="14px"
                    minW="150px"
                    borderColor="gray.100"
                    whiteSpace="nowrap"
                  >
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
