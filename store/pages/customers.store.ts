import { CustomerType } from "@/data/users";
import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";
import { createPageStore } from "../factories/createPageStore";

export type CustomersSortKey = keyof CustomerType;

export type CustomersPageFilterType =
    BaseFiltersType<CustomersSortKey> &
    PaginationFiltersType;

export const initialCustomersFilters: CustomersPageFilterType = {
    sortBy: "name",
    sortDir: "asc",
    searchValue: "",
    page: 1,
    itemsPerPage: 22
}

export const useCustomersPageStore =
    createPageStore<CustomersPageFilterType>({
        initialFilters: initialCustomersFilters
    });