import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import { deleteMenu, getMenus, menuSelectors } from "../features/menuSlices";
import {
    Link,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
    Button,
    Stack,
    Flex,
    Text,
    Tooltip,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import {
    AddIcon,
    DeleteIcon,
    EditIcon,
    PlusSquareIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";

const CustomTable = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );
    return (
        <TableContainer>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>

            <Flex justifyContent="space-between" m={4} alignItems="center">
                <Flex>
                    <Tooltip label="First Page">
                        <IconButton
                            onClick={() => gotoPage(0)}
                            isDisabled={!canPreviousPage}
                            icon={<ArrowLeftIcon h={3} w={3} />}
                            mr={4}
                        />
                    </Tooltip>
                    <Tooltip label="Previous Page">
                        <IconButton
                            onClick={previousPage}
                            isDisabled={!canPreviousPage}
                            icon={<ChevronLeftIcon h={6} w={6} />}
                        />
                    </Tooltip>
                </Flex>

                <Flex alignItems="center">
                    <Text flexShrink="0" mr={8}>
                        Page{" "}
                        <Text fontWeight="bold" as="span">
                            {pageIndex + 1}
                        </Text>{" "}
                        of{" "}
                        <Text fontWeight="bold" as="span">
                            {pageOptions.length}
                        </Text>
                    </Text>
                    <Text flexShrink="0">Go to page:</Text>{" "}
                    <NumberInput
                        ml={2}
                        mr={8}
                        w={28}
                        min={1}
                        max={pageOptions.length}
                        onChange={(value) => {
                            const page = value ? value - 1 : 0;
                            gotoPage(page);
                        }}
                        defaultValue={pageIndex + 1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        w={32}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </Flex>

                <Flex>
                    <Tooltip label="Next Page">
                        <IconButton
                            onClick={nextPage}
                            isDisabled={!canNextPage}
                            icon={<ChevronRightIcon h={6} w={6} />}
                        />
                    </Tooltip>
                    <Tooltip label="Last Page">
                        <IconButton
                            onClick={() => gotoPage(pageCount - 1)}
                            isDisabled={!canNextPage}
                            icon={<ArrowRightIcon h={3} w={3} />}
                            ml={4}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </TableContainer>
    );
};

const HomeMenu = () => {
    const dispatch = useDispatch();
    const menus = useSelector(menuSelectors.selectAll);

    const columns = useMemo(
        () => [
            {
                Header: "No",
                Cell: (row) => <Text>{row.row.index + 1}</Text>,
            },
            {
                Header: "Nama Menu",
                accessor: "nama",
            },
            {
                Header: "Harga",
                accessor: "harga",
            },
            {
                Header: "Action",
                Cell: (row) => (
                    <>
                        <ReactLink to={`/edit-menu/${row.row.original.id}`}>
                            <IconButton
                                colorScheme="teal"
                                size="md"
                                icon={<EditIcon />}
                            />
                        </ReactLink>
                        <IconButton
                            ml="2"
                            bgColor="red.500"
                            textColor="white"
                            size="md"
                            icon={<DeleteIcon />}
                            onClick={() =>
                                dispatch(deleteMenu(row.row.original.id))
                            }
                        />
                    </>
                ),
            },
        ],
        []
    );
    useEffect(() => {
        dispatch(getMenus());
    }, [dispatch]);

    return (
        <>
            <ReactLink to="/add-menu">
                <Stack direction="row" spacing={4} my="2" mx="4">
                    <Button
                        leftIcon={<PlusSquareIcon />}
                        colorScheme="teal"
                        variant="solid"
                    >
                        Add New Menu
                    </Button>
                </Stack>
            </ReactLink>
            <CustomTable columns={columns} data={menus} />
        </>
    );
};

export default HomeMenu;
