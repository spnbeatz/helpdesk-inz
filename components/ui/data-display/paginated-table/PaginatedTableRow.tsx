import { Table } from "@heroui/react";
import { Checkbox } from "../../controls/inputs/Checkbox";
import { highlightText } from "@/helpers/highlightText";
import { PaginatedTableRowProps, TableFilters } from "./types";


export const PaginatedTableRow = <
    T extends object,
    TFilters extends TableFilters<T>
>({
    selectable,
    columns,
    item,
    onRowClick,
    filters
}: PaginatedTableRowProps<T, TFilters>) => {

    return (
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
            {columns.map((column) => (
                <Table.Cell
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRowClick?.(item);
                    }}
                    key={`${column.id, column.name}`}
                >
                    {Array.isArray(item[column.id])
                        ? (item[column.id] as string[]).join(" ")
                        : column.customValue
                            ? column.customValue(item)
                            : highlightText(
                                String(item[column.id] ?? ""),
                                filters.searchValue
                            )
                    }
                </Table.Cell>
            ))}
        </Table.Row>
    )
}