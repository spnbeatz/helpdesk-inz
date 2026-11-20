export type PaginatedResponse<T> = {
    items: T[];
    totalItems: number;
    page: number;
    itemsPerPage: number;
}