import { UsersPageFiltersType } from "../types/filters.types";

export const initialUsersFilters: UsersPageFiltersType = {
    sortBy: "lastName",
    sortDir: "asc",
    searchValue: "",
    page: 1,
    itemsPerPage: 22
}
