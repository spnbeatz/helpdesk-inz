
import { Table } from "@heroui/react";
import { PaginatedTableColumnProps, TableFilters } from "./types";


export const PaginatedTableColumn = <
    T extends object,
    TFilters extends TableFilters<T>
>({
    column,
    sortKeys,
    setSort,
    index,
    columnsLength,
    filters
}: PaginatedTableColumnProps<T, TFilters>) => {
    if (Array.isArray(sortKeys) && sortKeys.includes(column.id)) {
        return (
            <Table.Column
                key={String(column.id)}
                allowsSorting={!!setSort}
                className={` text-black bg-transparent font-semibold py-3 ${index === columnsLength - 1
                    ? "rounded-r-md"
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
                        filters.sortBy === column.id
                            ? filters.sortDir === "asc"
                                ? "ascending"
                                : "descending"
                            : "descending"
                    }
                >
                    {column.name}
                </Table.SortableColumnHeader>
            </Table.Column>
        )
    } else {
        return (
            <Table.Column
                key={String(column.id)}
                className={`bg-transparent  text-black font-semibold py-3 ${index === columnsLength - 1
                    ? "rounded-r-md"
                    : ""
                    }`}
                isRowHeader={index === 0}
            >
                {column.name}
            </Table.Column>
        )
    }
}