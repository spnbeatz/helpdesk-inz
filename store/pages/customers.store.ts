import { CustomerType } from "@/data/users";
import { BaseFiltersType } from "@/types/filters.types";
import { createPageStore } from "../factories/createPageStore";

export type CustomersSortKey = keyof CustomerType;

export type CustomersPageFilterType =
    BaseFiltersType<CustomersSortKey>;

export const useCustomersPageStore =
    createPageStore<CustomersPageFilterType>({
        initialFilters: {
            sortBy: "name",
            sortDir: "asc",
            searchValue: ""
        },
        itemsPerPage: 22
    });