import { CustomerType } from "@/data/users";
import { create } from "zustand";

export type CustomersSortKey = keyof CustomerType;

export type CustomersPageFilterType = {
    sortBy?: CustomersSortKey,
    sortDir?: "asc" | "desc",
    searchValue?: string
}

type CustomersPageType = {
    filters: CustomersPageFilterType,
    setFilters: (filters: Partial<CustomersPageFilterType>) => void;
    itemsPerPage: number
}

export const useCustomersPageStore = create<CustomersPageType>((set) => ({
    filters: {
        sortBy: "name",
        sortDir: "asc",
        searchValue: ""
    },
    setFilters: (newFilters) =>
        set((state) => ({
            filters: {
                ...state.filters,
                ...newFilters
            }
        })),
    itemsPerPage: 22
}))