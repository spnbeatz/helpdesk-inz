import { Checkbox, Selection, Table } from "@heroui/react";
import { useState } from "react";
import { PaginationBasic } from "./PaginationBasic";
import { highlightText } from "@/helpers/highlightText";
import { Column } from "../layout/flex";

export type TableColumn<T> = {
    id: keyof T;
    name: string;
};

type TableWithPaginationProps<T extends object> = {
    data: T[];
    columns: TableColumn<T>[];
    itemsPerPage: number;

    searchValue?: string;

    sortBy?: keyof T;
    sortDir?: "asc" | "desc";
    setSort?: (column: keyof T) => void;

    selectable?: boolean;
    onRowClick?: (item: T) => void;
};

export const TableWithPagination = <T extends object>({
    data,
    columns,
    itemsPerPage,
    searchValue = "",
    sortBy,
    sortDir,
    setSort,
    selectable = false,
    onRowClick,
}: TableWithPaginationProps<T>) => {

    const [page, setPage] = useState<number>(1);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    const getPaginatedData = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return data.slice(startIndex, endIndex);
    };

    return (
        <Column className="w-full h-full min-h-0 gap-4 pt-4">
            <Table variant="secondary" className="h-full">
                <Table.ScrollContainer className="flex-1 min-h-0">
                    <Table.Content
                        selectedKeys={selectable ? selectedKeys : undefined}
                        onSelectionChange={
                            selectable ? setSelectedKeys : undefined
                        }
                        selectionMode={selectable ? "multiple" : undefined}
                    >
                        <Table.Header>

                            {selectable && (
                                <Table.Column className="bg-indigo-100/50 rounded-l-lg">
                                    <Checkbox
                                        aria-label="Select all"
                                        slot="selection"
                                    >
                                        <Checkbox.Content>
                                            <Checkbox.Control>
                                                <Checkbox.Indicator />
                                            </Checkbox.Control>
                                        </Checkbox.Content>
                                    </Checkbox>
                                </Table.Column>
                            )}

                            {columns.map((column, index) => (
                                <Table.Column
                                    key={String(column.id)}
                                    allowsSorting={!!setSort}
                                    className={`bg-indigo-100/50 ${index === columns.length - 1
                                            ? "rounded-r-lg"
                                            : ""
                                        }`}
                                    isRowHeader={column.id === "name"}
                                    onClick={() => {
                                        if (setSort) {
                                            setSort(column.id);
                                        }
                                    }}
                                >
                                    <Table.SortableColumnHeader
                                        sortDirection={
                                            sortBy === column.id
                                                ? sortDir === "asc"
                                                    ? "ascending"
                                                    : "descending"
                                                : "descending"
                                        }
                                    >
                                        {column.name}
                                    </Table.SortableColumnHeader>
                                </Table.Column>
                            ))}
                        </Table.Header>

                        <Table.Body items={getPaginatedData()}>
                            {(item) => (
                                <Table.Row>
                                    <Table.Collection>

                                        {selectable && (
                                            <Table.Cell
                                                className="pe-0"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <Checkbox slot="selection">
                                                    <Checkbox.Content>
                                                        <Checkbox.Control>
                                                            <Checkbox.Indicator />
                                                        </Checkbox.Control>
                                                    </Checkbox.Content>
                                                </Checkbox>
                                            </Table.Cell>
                                        )}

                                        {columns.map((column) => (
                                            <Table.Cell
                                                key={String(column.id)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRowClick?.(item);
                                                }}
                                            >
                                                {highlightText(
                                                    String(item[column.id] ?? ""),
                                                    searchValue
                                                )}
                                            </Table.Cell>
                                        ))}

                                    </Table.Collection>
                                </Table.Row>
                            )}
                        </Table.Body>

                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    <PaginationBasic
                        page={page}
                        setPage={setPage}
                        totalItems={data.length}
                        itemsPerPage={itemsPerPage}
                    />
                </Table.Footer>
            </Table>
        </Column>

    );
};