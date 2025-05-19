import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Avatar,
  Select,
  IconButton,
  InputGroup,
  InputRightElement,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
  MdDownload,
  MdPersonAdd,
  MdArrowUpward,
  MdArrowDownward,
  MdFilterList,
} from "react-icons/md";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  userType: string;
  status: string;
  profile?: string;
};

type UserTableProps = {
  tableData: User[];
};

const UserManagementTable: React.FC<UserTableProps> = ({ tableData }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("");

  const filteredData = useMemo(() => {
    return tableData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = userTypeFilter
        ? user.userType === userTypeFilter
        : true;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, tableData, userTypeFilter]);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => <Text fontSize="md">{info.getValue() as string}</Text>,
      },
      {
        accessorKey: "profile",
        header: "Profile",
        cell: ({ row }) => (
          <Avatar
            size="md"
            name={row.original.name}
            src={row.original.profile}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const name = row.original.name;
          const highlight = name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return (
            <Text fontSize="md" fontWeight={highlight ? "bold" : "normal"}>
              {name}
            </Text>
          );
        },
      },
      {
        accessorKey: "username",
        header: "Username",
        cell: (info) => (
          <Text fontSize="md">{info.getValue() as string}</Text>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => (
          <Text fontSize="md">{info.getValue() as string}</Text>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => (
          <Text fontSize="md">{info.getValue() as string}</Text>
        ),
      },
      {
        accessorKey: "userType",
        header: "User Type",
        cell: (info) => (
          <Text fontSize="md">{info.getValue() as string}</Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status.toLowerCase();
          const color =
            status === "active"
              ? "green.400"
              : status === "inactive"
              ? "red.400"
              : "orange.400";
          return (
            <Text fontSize="md" color={color} fontWeight="medium">
              {row.original.status}
            </Text>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <Flex gap={2}>
            <IconButton
              size="sm"
              colorScheme="blue"
              aria-label="Edit"
              icon={<MdEdit />}
            />
            <IconButton
              size="sm"
              colorScheme="red"
              aria-label="Delete"
              icon={<MdDelete />}
            />
          </Flex>
        ),
      },
    ],
    [searchTerm]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const handleExport = () => {
    const csvRows = [
      [
        "ID",
        "Name",
        "Username",
        "Email",
        "Created At",
        "User Type",
        "Status",
      ],
      ...filteredData.map((user) => [
        user.id,
        user.name,
        user.username,
        user.email,
        user.createdAt,
        user.userType,
        user.status,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_accounts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Flex mb={6} gap={4} flexWrap="wrap" align="center" justify="flex-end">
        <InputGroup size="md" w="280px">
          <Input
            bg="white"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.300"
            placeholder="Search by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon={<MdSearch />}
              aria-label="Search"
              size="sm"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>

        <Menu>
          <Tooltip label="Filter by User Type">
            <MenuButton
              as={IconButton}
              icon={<MdFilterList />}
              variant="outline"
              colorScheme="gray"
              aria-label="Filter"
            />
          </Tooltip>
          <MenuList>
            <MenuItem onClick={() => setUserTypeFilter("")}>All</MenuItem>
            <MenuItem onClick={() => setUserTypeFilter("admin")}>
              Admin
            </MenuItem>
            <MenuItem onClick={() => setUserTypeFilter("user")}>User</MenuItem>
          </MenuList>
        </Menu>

        <Tooltip label="Export CSV">
          <IconButton
            onClick={handleExport}
            size="md"
            colorScheme="teal"
            icon={<MdDownload />}
            aria-label="Export"
          />
        </Tooltip>

        <Button
          size="md"
          colorScheme="blue"
          leftIcon={<MdPersonAdd />}
          onClick={() => console.log("Open add user modal")}
        >
          Add User
        </Button>
      </Flex>

      <Box
        borderRadius="xl"
        overflow="hidden"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
      >
        <Table variant="simple" size="md">
          <Thead bg="blue.500">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    color="white"
                    fontSize="md"
                    cursor={header.column.getCanSort() ? "pointer" : "default"}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex justify="space-between" align="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <MdArrowUpward />,
                        desc: <MdArrowDownward />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
              >
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

      <Flex justify="space-between" align="center" mt={6}>
        <Text fontSize="md">
          Showing {table.getRowModel().rows.length} of {tableData.length} users
        </Text>
        <Flex gap={2}>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            size="md"
            leftIcon={<MdChevronLeft />}
          >
            Prev
          </Button>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            size="md"
            rightIcon={<MdChevronRight />}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserManagementTable;
