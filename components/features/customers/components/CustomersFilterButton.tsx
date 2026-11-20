import { FilterPopover } from "@/components/composed/filters/FilterPopover"
import { CustomersPageFilterType, CustomersSortKey, useCustomersPageStore } from "@/store/pages/customers.store"
import { customersFiltersConfig } from "../config/customersFilters.config";
import { initialCustomersFilters } from "@/store/pages/customers.store";

export const CustomersFilterButton = () => {

    const { filters, setFilters } = useCustomersPageStore();

    return (
        <FilterPopover<CustomersSortKey,CustomersPageFilterType>
            config={customersFiltersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={() => setFilters(initialCustomersFilters)}
        />
    )
}