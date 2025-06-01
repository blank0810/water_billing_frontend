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
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdSearch,
  MdSort,
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete,
  MdAdd,
  MdRemoveRedEye,
  MdFileDownload,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { RowObj } from '@/views/data/consumer/consumerData';
import Card from '@/components/card/Card';

const columnHelper = createColumnHelper<RowObj>();

export default function ConsumerManagementTable({ tableData }: { tableData: RowObj[] }) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const columns = [
    columnHelper.accessor('id', {
      header: () => <Text fontSize="sm" color="gray.400">ID</Text>,
      cell: info => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('profile', {
      header: () => <Text fontSize="sm" color="gray.400">PROFILE</Text>,
      cell: info => <Avatar name={info.getValue()} size="sm" />,
    }),
    columnHelper.accessor('name', {
      header: () => <Text fontSize="sm" color="gray.400">NAME</Text>,
      cell: info => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('meterNo', {
      header: () => <Text fontSize="sm" color="gray.400">METER NO</Text>,
      cell: info => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('address', {
      header: () => <Text fontSize="sm" color="gray.400">ADDRESS</Text>,
      cell: info => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('contact', {
      header: () => <Text fontSize="sm" color="gray.400">CONTACT</Text>,
      cell: info => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('status', {
      header: () => <Text fontSize="sm" color="gray.400">STATUS</Text>,
      cell: info => {
        const value = info.getValue();
        const color =
          value === 'Paid' ? 'green.500' :
          value === 'Unpaid' ? 'red.500' :
          value === 'Pending' ? 'orange.500' : 'gray.500';
        const icon =
          value === 'Paid' ? MdCheckCircle :
          value === 'Unpaid' ? MdCancel :
          value === 'Pending' ? MdOutlineError : MdCancel;

        return (
          <Flex align="center">
            <Icon w="20px" h="20px" me="5px" color={color} as={icon} />
            <Text color={textColor} fontSize="sm" fontWeight="700">{value}</Text>
          </Flex>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      header: () => <Text fontSize="sm" color="gray.400">CREATED AT</Text>,
      cell: info => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.display({
      id: 'action',
      header: () => <Text fontSize="sm" color="gray.400">ACTION</Text>,
      cell: info => {
        const row = info.row.original;
        return (
          <Flex gap="10px">
            <Box as="button" onClick={() => router.push(`/admin/consumer-management/view/${row.id}`)}>
              <Icon as={MdRemoveRedEye} w={5} h={5} color="blue.300" _hover={{ color: 'blue.600' }} />
            </Box>
            <Box as="button">
              <Icon as={MdEdit} w={5} h={5} color="blue.500" _hover={{ color: 'blue.700' }} />
            </Box>
            <Box as="button">
              <Icon as={MdDelete} w={5} h={5} color="red.500" _hover={{ color: 'red.700' }} />
            </Box>
          </Flex>
        );
      },
    }),
  ];

  const filteredData = React.useMemo(() =>
    tableData.filter(row =>
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

  const handleExport = () => {
    const csv = [
      ['ID', 'Name', 'Meter No', 'Address', 'Contact', 'Status', 'Created At'],
      ...filteredData.map(row => [
        row.id,
        row.name,
        row.meterNo,
        row.address,
        row.contact,
        row.status,
        row.createdAt,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'consumers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      {/* Header */}
      <Flex px="25px" py="20px" justifyContent="space-between" align="center" wrap="wrap" gap="20px">
        <Text color={textColor} fontSize="20px" fontWeight="600">Consumers</Text>
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
                width: '100%',
              }}
            />
            <Icon as={MdSearch} w={5} h={5} color="blue.500" ml="8px" />
          </Flex>

          <Button onClick={handleExport} size="sm" variant="outline" borderRadius="md">
            <Icon as={MdFileDownload} mr={2} />
          </Button>

          <Button
            size="sm"
            colorScheme="blue"
            px="16px"
            onClick={() => router.push('/admin/consumer-management/add-consumer')}
            leftIcon={<MdAdd />}
          >
            Add Consumer
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
          borderColor={borderColor}
          cursor="pointer"
          onClick={header.column.getToggleSortingHandler()}
        >
          <Flex justify="space-between" align="center">
            {flexRender(header.column.columnDef.header, header.getContext())}
            {/* Removed the MdSort icon */}
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
                  <Td key={cell.id} fontSize="14px" minW="150px" borderColor="gray.100" whiteSpace="nowrap">
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
          <Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()} leftIcon={<MdChevronLeft />} size="sm">
            Prev
          </Button>
          <Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()} rightIcon={<MdChevronRight />} size="sm">
            Next
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
