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
  useReactTable
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import { MdCancel, MdCheckCircle, MdOutlineError, MdEdit, MdDelete, MdSearch, MdSort, MdAdd } from 'react-icons/md';
import * as React from 'react';

type RowObj = {
  id: string;
  profile: string;
  name: string;
  address: string;
  contact: string;
  status: string;
  createdAt: string;
  action: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function UserManagementTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
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
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => <Text fontSize="sm" color="gray.400">CREATED AT</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>
    }),
    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Text fontSize="sm" color="gray.400">ACTION</Text>,
      cell: () => (
        <Flex gap="10px">
          <Box as="button">
            <Icon as={MdEdit} w={5} h={5} color="blue.500" _hover={{ color: 'blue.700' }} />
          </Box>
          <Box as="button">
            <Icon as={MdDelete} w={5} h={5} color="red.500" _hover={{ color: 'red.700' }} />
          </Box>
        </Flex>
      )
    })
  ];

  const [data, setData] = React.useState(() => [...tableData]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

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
        <Text color={textColor} fontSize="20px" fontWeight="600" lineHeight="100%">
          User Accounts
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
            <input
              type="text"
              placeholder="Search user..."
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

          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            _hover={{ bg: 'gray.200' }}
            height="38px"
            px="12px"
          >
            <Icon as={MdSort} />
          </Button>

          <Button
            size="sm"
            colorScheme="blue"
            height="38px"
            px="16px"
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

      {/* Pagination (Right-aligned) */}
      <Flex justify="flex-end" px="25px" pb="20px">
        <Text fontSize="sm" color="gray.500">Page 1 of 5</Text>
      </Flex>
    </Card>
  );
}
