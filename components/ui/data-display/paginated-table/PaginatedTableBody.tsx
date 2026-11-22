import { Table } from "@heroui/react";
import { highlightText } from "@/helpers/highlightText";
import { EmptyState } from "@heroui/react";
import { LuInbox } from "react-icons/lu";
import { Checkbox } from "../../controls/inputs/Checkbox";
import { PaginatedTableBodyProps, TableFilters } from "./types";
import { PaginatedTableRow } from "./PaginatedTableRow";


export const PaginatedTableBody = <
    T extends object,
    TFilters extends TableFilters<T>
>({
    columns,
    data,
    selectable,
    onRowClick,
    filters
}: PaginatedTableBodyProps<T, TFilters>) => {
    return (
        <Table.Body
            dependencies={[columns]}
            items={data}
            renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center py-10">
                    <LuInbox className="text-3xl text-black/40" />
                    <span className="text-md text-black/40">No results found</span>
                </EmptyState>
            )}
        >
            {(item) => (
                <PaginatedTableRow 
                    item={item}
                    columns={columns}
                    selectable={selectable}
                    onRowClick={onRowClick}
                    filters={filters}
                />
            )}
        </Table.Body>
    )
}