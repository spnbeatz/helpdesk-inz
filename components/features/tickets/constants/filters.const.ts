import { TicketsPageFiltersType } from "../types/filters.types";

export const initialTicketsFilters: TicketsPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    status: "all",
    itemsPerPage: 15,
    page: 1,
    priorityId: [],
    categoryId: [],
    createdAfter: undefined,
    createdBefore: undefined
};