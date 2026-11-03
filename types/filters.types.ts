export type SortDirection = "asc" | "desc";

export type BaseFiltersType<TSortKey extends string> = {
    sortBy?: TSortKey;
    sortDir?: SortDirection;
    searchValue?: string;
};

export type DateRangeFiltersType = {
    createdAfter?: string;
    createdBefore?: string;
};

export type PaginationFiltersType = {
    limit?: number;
};