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
import { MdArrowForwardIos, MdSearch, MdSort, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { RowObj } from 'views/data/consumer/consumerData';

const columnHelper = createColumnHelper<RowObj>();

export default function LedgerTable(props: { tableData: RowObj[] }) {
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
    columnHelper.accessor('accountNo', {
      id: 'accountNo',
      header: () => <Text fontSize="sm" color="gray.400">ACCOUNT NO.</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.accessor('meterNo', {
      id: 'meterNo',
      header: () => <Text fontSize="sm" color="gray.400">METER NO.</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => <Text fontSize="sm" color="gray.400">DATE</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.display({
      id: 'action',
      header: () => <Text fontSize="sm" color="gray.400"> </Text>,
      cell: (info) => (
        <Flex justify="center">
          <Icon as={MdArrowForwardIos} boxSize={4} color="gray.400" />
        </Flex>
      ),
    }),
  ];

  const filteredData = React.useMemo(
    () =>
      tableData.filter(
        (row) =>
          row.accountNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.meterNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.date?.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Text color={textColor} fontSize="20px" fontWeight="600">Ledger</Text>

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
        </Flex>
      </Flex>

      {/* Table */}
      <Box maxW="100%" overflowX="auto" overflowY="auto" px="20px" pb="20px" style={{ maxHeight: '70vh' }}>
        <Table variant="simple" color="gray.500" minW="800px">
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
                    minW="120px"
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
