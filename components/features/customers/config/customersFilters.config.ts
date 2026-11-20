import { FilterConfig } from "@/components/composed/filters/types";
import { CustomerType } from "@/data/users";
import { CustomersPageFilterType, CustomersSortKey } from "@/store/pages/customers.store";


export const customersFiltersConfig: FilterConfig<CustomersPageFilterType, CustomersSortKey> = {
    sortOptions: [
        {value: "email", label: "Email"},
        {value: "name", label: "Name"},
    ],
    filters: [
        
    ]
}