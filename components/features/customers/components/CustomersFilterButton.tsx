import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { CustomersPageFilterType, CustomersSortKey } from "../types/filters.types";
import { useCustomersPageStore } from "../store/page.store";
import { customersFiltersConfig } from "../config/filters.config";
import { initialCustomersFilters } from "../constants/filters.const";

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