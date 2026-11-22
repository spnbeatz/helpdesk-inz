import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";


export type TableColumn<T> = {
    id: keyof T;
    name: string;
    customValue?: (item: T) => React.ReactNode
};

export type TableFilters<T> =
    BaseFiltersType<Extract<keyof T, string>> &
    PaginationFiltersType;

export type PaginatedTableProps<
    T extends object,
    TFilters extends TableFilters<T>
> = {
    data?: T[];
    columns: TableColumn<T>[];

    filters: TFilters;
    setFilters: (filters: Partial<TFilters>) => void;

    sortKeys?: (keyof T)[];

    selectable?: boolean;
    onRowClick?: (item: T) => void;
    pagination?: boolean;
    totalItems?: number;
};

export type PaginatedTableColumnProps<
    T extends object,
    TFilters extends TableFilters<T>
> = Pick<
    PaginatedTableProps<T, TFilters>,
    "sortKeys" | "filters"
> & {
    column: TableColumn<T>;
    setSort: (column: keyof T) => void;
    index: number;
    columnsLength: number;
};

export type PaginatedTableBodyProps<
    T extends object,
    TFilters extends TableFilters<T>
> = Pick<
    PaginatedTableProps<T, TFilters>,
    "sortKeys" | "filters" | "columns" | "data" | "selectable" | "onRowClick"
>;

export type PaginatedTableHeaderProps<
    T extends object,
    TFilters extends TableFilters<T>
> = Pick<
    PaginatedTableProps<T, TFilters>,
    "columns" | "sortKeys" | "filters" | "selectable"
> & {
    setSort: (column: keyof T) => void;
};

export type PaginatedTableRowProps<
    T extends object,
    TFilters extends TableFilters<T>
> = Pick<
    PaginatedTableProps<T, TFilters>,
    "filters" | "selectable" | "columns" | "onRowClick"
> & {
    item: T
};