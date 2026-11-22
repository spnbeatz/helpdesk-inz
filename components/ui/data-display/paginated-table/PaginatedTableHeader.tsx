import { Table } from "@heroui/react";
import { Checkbox } from "../../controls/inputs/Checkbox";
import { PaginatedTableColumn } from "./PaginatedTableColumn";
import { PaginatedTableHeaderProps, TableFilters } from "./types";


export const PaginatedTableHeader = <
    T extends object,
    TFilters extends TableFilters<T>
>({
    selectable,
    sortKeys,
    columns,
    setSort,
    filters
}: PaginatedTableHeaderProps<T, TFilters>) => {
    return (
        <Table.Header className={"shadow-xs "}>

            {selectable && (
                <Table.Column className="bg-transparent rounded-l-lg py-3">
                    <Checkbox
                        aria-label="Select all"
                        slot="selection"
                    />
                </Table.Column>
            )}

            {columns.map((column, index) => (
                <PaginatedTableColumn 
                    key={column.name + "table"}
                    column={column}
                    sortKeys={sortKeys}
                    setSort={setSort}
                    index={index}
                    columnsLength={columns.length}
                    filters={filters}
                />
            ))}
        </Table.Header>
    )
}