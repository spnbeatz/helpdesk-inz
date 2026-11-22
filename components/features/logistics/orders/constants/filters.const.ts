import { OrdersPageFiltersType } from "../types/filters.types"

export const initialOrdersFilters: OrdersPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    status: "all",
    itemsPerPage: 25,
    page: 1
}