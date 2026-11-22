import { CustomersPageFilterType } from "../types/filters.types";

export const initialCustomersFilters: CustomersPageFilterType = {
    sortBy: "name",
    sortDir: "asc",
    searchValue: "",
    page: 1,
    itemsPerPage: 22
}