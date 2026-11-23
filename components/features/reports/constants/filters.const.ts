import { ReportsPageFiltersType } from "../types/filters.types";

export const initialReportsFilters: ReportsPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    page: 1,
    itemsPerPage: 10
}