import { Selection, Table } from "@heroui/react";
import { useState } from "react";
import { PaginationBasic } from "./PaginationBasic";
import { highlightText } from "@/helpers/highlightText";
import { Column } from "../layout/flex";
import { EmptyState } from "@heroui/react";
import { LuInbox } from "react-icons/lu";
import { Checkbox } from "../controls/inputs/Checkbox";

export type TableColumn<T> = {
    id: keyof T;
    name: string;
    customValue?: (item: T) => React.ReactNode
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

    pagination?: boolean
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
    pagination = true
}: TableWithPaginationProps<T>) => {

    const [page, setPage] = useState<number>(1);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    const getPaginatedData = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return data.slice(startIndex, endIndex);
    };



    return (
        <Column className="w-full h-full min-h-0 gap-4">
            <Table variant="secondary" className="h-full" aria-label="table">
                <Table.ScrollContainer className="flex-1 min-h-0">
                    <Table.Content
                        aria-label="tablecontent"
                        selectedKeys={selectable ? selectedKeys : undefined}
                        onSelectionChange={
                            selectable ? setSelectedKeys : undefined
                        }
                        selectionMode={selectable ? "multiple" : undefined}
                    >
                        <Table.Header className={"shadow-xs"}>

                            {selectable && (
                                <Table.Column className="bg-indigo-200/60 rounded-l-lg py-3">
                                    <Checkbox
                                        aria-label="Select all"
                                        slot="selection"
                                    />
                                </Table.Column>
                            )}

                            {columns.map((column, index) => (
                                <Table.Column
                                    key={String(column.id)}
                                    allowsSorting={!!setSort}
                                    className={`bg-indigo-200/60  text-black/60 py-3 ${index === columns.length - 1
                                        ? "rounded-r-lg"
                                        : ""
                                        }`}
                                    isRowHeader={index === 0}
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

                        <Table.Body
                            dependencies={[columns]}
                            items={getPaginatedData()}
                            renderEmptyState={() => (
                                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center py-10">
                                    <LuInbox className="text-3xl text-black/40" />
                                    <span className="text-md text-black/40">No results found</span>
                                </EmptyState>
                            )}
                        >
                            {(item) => (
                                <Table.Row
                                    id={String((item as { id: string }).id)}
                                    className="border-b-0"
                                >
                                    {selectable && (
                                        <Table.Cell
                                            className="pe-0"

                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox slot="selection" aria-label="Select Row" />
                                        </Table.Cell>
                                    )}

                                    <Table.Collection items={columns}>
                                        {(column) => (
                                            <Table.Cell
                                                onPointerDown={(e) => e.stopPropagation()}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRowClick?.(item);
                                                }}
                                            >
                                                {Array.isArray(item[column.id])
                                                    ? (item[column.id] as string[]).join(" ")
                                                    : column.customValue
                                                        ? column.customValue(item)
                                                        : highlightText(
                                                            String(item[column.id] ?? ""),
                                                            searchValue
                                                        )
                                                }
                                            </Table.Cell>
                                        )}
                                    </Table.Collection>
                                </Table.Row>
                            )}
                        </Table.Body>

                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    {pagination && data && data.length > 0 && <PaginationBasic
                        page={page}
                        setPage={setPage}
                        totalItems={data.length}
                        itemsPerPage={itemsPerPage}
                    />}
                </Table.Footer>
            </Table>
        </Column>

    );
};