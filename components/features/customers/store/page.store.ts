import { createPageStore } from "@/store/factories/createPageStore";
import { CustomersPageFilterType } from "../types/filters.types";
import { initialCustomersFilters } from "../constants/filters.const";

export const useCustomersPageStore =
    createPageStore<CustomersPageFilterType>({
        initialFilters: initialCustomersFilters
    });