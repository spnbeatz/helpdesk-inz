import { Selection, Table } from "@heroui/react";
import { useState } from "react";
import { PaginationBasic } from "../PaginationBasic";
import { Column } from "../../layout/flex";
import { PaginatedTableHeader } from "./PaginatedTableHeader";
import { PaginatedTableBody } from "./PaginatedTableBody";
import { PaginatedTableProps, TableFilters, TableColumn } from "./types";
import { useCallback } from "react";

export const PaginatedTable = <
    T extends object,
    TFilters extends TableFilters<T>
>({
    data,
    columns,
    filters,
    setFilters,
    selectable = false,
    onRowClick,
    pagination = true,
    totalItems,
    sortKeys
}: PaginatedTableProps<T, TFilters>) => {

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    const setPage = useCallback((page: number) => {
        setFilters({ page } as Partial<TFilters>)
    }, [setFilters])

    

    const setSort = (column: keyof T) => {
        setFilters({
            sortBy: column,
            sortDir:
                filters.sortBy === column && filters.sortDir === "asc"
                    ? "desc"
                    : "asc",
            page: 1
        } as Partial<TFilters>);
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
                        <PaginatedTableHeader
                            selectable={selectable}
                            sortKeys={sortKeys}
                            columns={columns}
                            filters={filters}
                            setSort={setSort}
                        />
                        <PaginatedTableBody
                            columns={columns}
                            filters={filters}
                            data={data}
                            selectable={selectable}
                            onRowClick={onRowClick}
                        />

                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    {pagination && data && data.length > 0 && <PaginationBasic
                        page={filters.page || 1}
                        setPage={(page) => setPage(page)}
                        totalItems={totalItems || 0}
                        itemsPerPage={filters.itemsPerPage || 25}
                    />}
                </Table.Footer>
            </Table>
        </Column>

    );
};