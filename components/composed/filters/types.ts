import { BaseFiltersType } from "@/types/filters.types";

export type SortDirection = "asc" | "desc";

export type FilterOption = {
    label: string;
    value: string;
};

export type FilterDefinition<T> =
    | {
        key: keyof T;
        label: string;
        type: "select" | "multi-select";
        options?: FilterOption[];
    }
    | {
        key: keyof T;
        label: string;
        type: "checkbox" | "text";
    }
    | {
        type: "date-range";
        label: string;
        fromKey: keyof T;
        toKey: keyof T;
    };

export type FilterConfig<TFilters, TSortKey extends string> = {
    sortOptions: {
        label: string;
        value: TSortKey;
    }[];

    filters: FilterDefinition<TFilters>[];
};

export type FilterPopoverProps<
    TFilters extends BaseFiltersType<TSortKey>,
    TSortKey extends string
> = {
    config: FilterConfig<TFilters, TSortKey>;
    filters: TFilters;
    setFilters: (filters: Partial<TFilters>) => void;
    onClear: () => void;
    children?: React.ReactNode
};