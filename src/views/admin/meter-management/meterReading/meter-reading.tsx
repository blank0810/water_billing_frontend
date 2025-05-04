'use client';

import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';
import Card from 'components/card/Card';
import { RowObj } from 'views/data/consumer/consumerData';
import { consumerAllData } from 'views/data/consumer/consumerDummyData';

const columnHelper = createColumnHelper<RowObj>();

export default function MeterReading() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const columns = [
    columnHelper.accessor('id', {
      header: () => <Text fontSize="sm" color="gray.400">ID</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('name', {
      header: () => <Text fontSize="sm" color="gray.400">NAME</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('meterNo', {
      header: () => <Text fontSize="sm" color="gray.400">METER NO</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('previousReading', {
      header: () => <Text fontSize="sm" color="gray.400">PREVIOUS READING</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('presentReading', {
      header: () => <Text fontSize="sm" color="gray.400">PRESENT READING</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('date', {
      header: () => <Text fontSize="sm" color="gray.400">DATE</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
  ];

  const table = useReactTable({
    data: consumerAllData, // Make sure this data is correct
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card flexDirection="column" w="100%" h="100%" px="0px" overflow="hidden">
      <Box maxW="100%" overflowX="auto" px="20px" pb="20px">
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
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
