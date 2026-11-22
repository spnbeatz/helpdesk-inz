import { CustomerType } from "@/data/users";
import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";

export type CustomersSortKey = keyof CustomerType;

export type CustomersPageFilterType =
    BaseFiltersType<CustomersSortKey> &
    PaginationFiltersType;