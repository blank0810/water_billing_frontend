'use client';

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
  Avatar,
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
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdSearch,
  MdSort,
  MdArrowForwardIos,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { RowObj } from 'views/data/consumer/consumerData';

const columnHelper = createColumnHelper<RowObj>();

export default function RateManagementTable(props: { tableData: RowObj[] }) {
  const { tableData } = props;
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => <Text fontSize="sm" color="gray.400">ID</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>
    }),
   columnHelper.accessor('profile', {
         id: 'profile',
         header: () => <Text fontSize="sm" color="gray.400">PROFILE</Text>,
         cell: (info) => <Avatar name={info.getValue()} size="sm" />
       }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <Text fontSize="sm" color="gray.400">NAME</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>
    }),
    columnHelper.accessor('address', {
      id: 'address',
      header: () => <Text fontSize="sm" color="gray.400">ADDRESS</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.accessor('contact', {
      id: 'contact',
      header: () => <Text fontSize="sm" color="gray.400">CONTACT</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Text fontSize="sm" color="gray.400">STATUS</Text>,
      cell: (info) => {
        const value = info.getValue();
        const color =
          value === 'Paid' ? 'green.500' :
          value === 'Unpaid' ? 'red.500' :
          value === 'Pending' ? 'orange.500' : 'gray.500';

        const icon =
          value === 'Paid' ? MdCheckCircle :
          value === 'Unpaid' ? MdCancel :
          value === 'Pending' ? MdOutlineError : MdCancel;

        const row = info.row.original;

        return (
          <Flex align="center" justify="space-between" cursor="pointer" onClick={() => router.push(`/admin/rate-management2${row.id}`)}>
            <Flex align="center">
              <Icon w="20px" h="20px" me="5px" color={color} as={icon} />
              <Text color={textColor} fontSize="sm" fontWeight="700">{value}</Text>
            </Flex>
            <Icon as={MdArrowForwardIos} boxSize={4} color="gray.400" />
          </Flex>
        );
      }
    }),
  ];

  const filteredData = React.useMemo(
    () =>
      tableData.filter(
        (row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.contact.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, tableData]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      {/* Header and Search */}
      <Flex
        px="25px"
        py="20px"
        justifyContent="space-between"
        align="center"
        flexWrap="wrap"
        gap="20px"
        direction={{ base: 'column', md: 'row' }}
      >
        <Text color={textColor} fontSize="20px" fontWeight="600">Current Rates</Text>

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
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: textColor,
                width: '100%'
              }}
            />
            <Icon as={MdSearch} w={5} h={5} color="blue.500" cursor="pointer" ml="8px" />
          </Flex>

          <Button size="sm" variant="outline" borderRadius="md" _hover={{ bg: 'gray.200' }}>
            <Icon as={MdSort} />
          </Button>

          <Button size="sm" colorScheme="blue" height="38px" px="16px" onClick={() => router.push('/upload-user-rate')}>
            Upload User Rate
          </Button>
        </Flex>
      </Flex>

      {/* Table */}
      <Box maxW="100%" overflowX="auto" overflowY="auto" px="20px" pb="20px" style={{ maxHeight: '70vh' }}>
        <Table variant="simple" color="gray.500" minW="1000px">
          <Thead position="sticky" top={0} bg={useColorModeValue('gray.100', 'gray.700')} zIndex={1}>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
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
                      <Icon as={MdSort} boxSize={4} color="gray.400" />
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
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

      <Flex justify="space-between" align="center" px="25px" pb="20px">
              <Text fontSize="sm" color="gray.500">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </Text>
              <Flex gap="4px">
                <Button
                  onClick={() => table.previousPage()}
                  isDisabled={!table.getCanPreviousPage()}
                  leftIcon={<MdChevronLeft />}
                  size="sm"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => table.nextPage()}
                  isDisabled={!table.getCanNextPage()}
                  rightIcon={<MdChevronRight />}
                  size="sm"
                >
                  Next
                </Button>
              </Flex>
            </Flex>
    </Card>
  );
}
