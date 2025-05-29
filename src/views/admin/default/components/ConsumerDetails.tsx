import {
  Badge,
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

type RowObj = {
  area: string;
  totalConsumers: number;
  totalActive: number;
  totalInactive: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function TopAreaTable({ tableData }: { tableData: RowObj[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Colors & shadows to match OverallOverview theme
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.50', 'whiteAlpha.300');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  const shadowHover = useColorModeValue('md', 'dark-lg');

  const columns = [
    columnHelper.accessor('area', {
      header: () => (
        <Text fontSize="sm" fontWeight="semibold" color={subTextColor}>
          Area
        </Text>
      ),
      cell: (info) => (
        <Text fontSize="md" fontWeight="bold" color={textColor}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('totalConsumers', {
      header: () => (
        <Text fontSize="sm" fontWeight="semibold" color={subTextColor}>
          Total Consumers
        </Text>
      ),
      cell: (info) => (
        <Text fontSize="md" color={textColor}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('totalActive', {
      header: () => (
        <Text fontSize="sm" fontWeight="semibold" color={subTextColor}>
          Total Active
        </Text>
      ),
      cell: (info) => (
        <Badge
          colorScheme="green"
          variant="subtle"
          fontSize="sm"
          borderRadius="md"
          px={3}
          py={1}
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('totalInactive', {
      header: () => (
        <Text fontSize="sm" fontWeight="semibold" color={subTextColor}>
          Total Inactive
        </Text>
      ),
      cell: (info) => (
        <Badge
          colorScheme="red"
          variant="subtle"
          fontSize="sm"
          borderRadius="md"
          px={3}
          py={1}
        >
          {info.getValue()}
        </Badge>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box
      w="100%"
      overflowX="auto"
      bg={cardBg}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 6 }}
      transition="all 0.2s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: shadowHover,
      }}
    >
      <Flex mb={6} align="center" justify="space-between">
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="semibold" color={textColor}>
          Consumer Details
        </Text>
      </Flex>

      <Table size="md" variant="unstyled" whiteSpace="nowrap">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <Th
                    key={header.id}
                    px={{ base: 3, md: 4 }}
                    py={3}
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    fontSize="sm"
                    fontWeight="semibold"
                    color={subTextColor}
                    textTransform="none"
                    cursor="pointer"
                    userSelect="none"
                    onClick={header.column.getToggleSortingHandler()}
                    _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
                    aria-sort={
                      isSorted ? (isSorted === 'asc' ? 'ascending' : 'descending') : undefined
                    }
                  >
                    <Flex align="center" justify="space-between" userSelect="none">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <Box as="span" ml={2} fontSize="lg" lineHeight="1">
                        {{
                          asc: '▲',
                          desc: '▼',
                        }[isSorted as string] ?? ''}
                      </Box>
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              _hover={{ bg: hoverBg }}
              transition="background-color 0.25s ease"
              cursor="default"
            >
              {row.getVisibleCells().map((cell) => (
                <Td
                  key={cell.id}
                  px={{ base: 3, md: 4 }}
                  py={4}
                  fontSize="md"
                  color={textColor}
                  border="none"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
