import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { initialOrdersFilters } from "../constants/filters.const";
import { OrdersPageFiltersType, OrdersSortKey } from "../types/filters.types";
import { useOrdersPageStore } from "../store/page.store";
import { ordersFiltersConfig } from "../config/filters.config";

export const OrdersFilterButton = () => {

    const { filters, setFilters } = useOrdersPageStore();

    return (
        <FilterPopover<OrdersSortKey, OrdersPageFiltersType>
            config={ordersFiltersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={() => setFilters(initialOrdersFilters)}
        />
    )
}