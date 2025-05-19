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
  Avatar
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdEdit,
  MdDelete,
  MdSearch,
  MdSort,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdVisibility,
  MdDownload
} from 'react-icons/md';
import * as React from 'react';
import { RowObj } from 'views/data/user/userData';
import { useRouter } from 'next/navigation';

const columnHelper = createColumnHelper<RowObj>();

export default function UserManagementTable(props: { tableData: RowObj[] }) {
  const { tableData } = props;
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const filteredData = React.useMemo(() => {
    return tableData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, tableData]);

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
    columnHelper.accessor('username', {
      id: 'username',
      header: () => <Text fontSize="sm" color="gray.400">USERNAME</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">@{info.getValue()}</Text>
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <Text fontSize="sm" color="gray.400">EMAIL</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">@{info.getValue()}</Text>
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => <Text fontSize="sm" color="gray.400">CREATED AT</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.accessor('userType', {
      id: 'userType',
      header: () => <Text fontSize="sm" color="gray.400">USER TYPE</Text>,
      cell: (info) => (
        <Text
          color={info.getValue() === 'admin' ? 'blue.500' : 'gray.600'}
          fontSize="sm"
          fontWeight="600"
        >
          {info.getValue().toUpperCase()}
        </Text>
      )
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Text fontSize="sm" color="gray.400">STATUS</Text>,
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="20px"
            h="20px"
            me="5px"
            color={
              info.getValue() === 'Active' ? 'green.500' :
              info.getValue() === 'Inactive' ? 'red.500' :
              info.getValue() === 'Error' ? 'orange.500' : 'gray.500'
            }
            as={
              info.getValue() === 'Active' ? MdCheckCircle :
              info.getValue() === 'Inactive' ? MdCancel :
              info.getValue() === 'Error' ? MdOutlineError : MdCancel
            }
          />
          <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>
        </Flex>
      )
    }),
    columnHelper.display({
      id: 'action',
      header: () => <Text fontSize="sm" color="gray.400">ACTION</Text>,
      cell: (info) => (
        <Flex gap="10px">
          <Box as="button" onClick={() => router.push(`/admin/user-management/view/${info.row.original.id}`)}>
            <Icon as={MdVisibility} w={5} h={5} color="blue.300" _hover={{ color: 'gray.800' }} />
          </Box>
          <Box as="button">
            <Icon as={MdEdit} w={5} h={5} color="blue.600" _hover={{ color: 'blue.700' }} />
          </Box>
          <Box as="button">
            <Icon as={MdDelete} w={5} h={5} color="red.500" _hover={{ color: 'red.700' }} />
          </Box>
        </Flex>
      )
    })
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

  const handleExport = () => {
    // TODO: Add CSV or Excel export logic here
    alert('Export feature will be implemented soon.');
  };

  return (
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      <Flex
        px="25px"
        py="20px"
        justifyContent="space-between"
        align="center"
        flexWrap="wrap"
        gap="20px"
        direction={{ base: 'column', md: 'row' }}
      >
        <Text color={textColor} fontSize="20px" fontWeight="600">User Accounts</Text>

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
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            _hover={{ bg: 'gray.200' }}
            onClick={handleExport}
          >
            <Icon as={MdDownload} />
          </Button>

          <Button
            size="sm"
            colorScheme="blue"
            height="38px"
            px="16px"
            onClick={() => router.push('/admin/user-management/add-user')}
            leftIcon={<MdAdd />}
          >
            Add User
          </Button>
        </Flex>
      </Flex>

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

