import { FilterConfig } from "@/components/composed/filters/types";
import { CustomersPageFilterType, CustomersSortKey } from "../types/filters.types";

export const customersFiltersConfig: FilterConfig<CustomersPageFilterType, CustomersSortKey> = {
    sortOptions: [
        {value: "email", label: "Email"},
        {value: "name", label: "Name"},
    ],
    filters: [
        
    ]
}