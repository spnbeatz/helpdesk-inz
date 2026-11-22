import { InventoryPageFiltersType } from "../types/filters.types";

export const initialInventoryFilters: InventoryPageFiltersType = {
    sortBy: "name",
    sortDir: "asc",
    searchValue: "",
    status: "all",
    page: 1,
    itemsPerPage: 25,
    userIds: [],
    userId: undefined
}