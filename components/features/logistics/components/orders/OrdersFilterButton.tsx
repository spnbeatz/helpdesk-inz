import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { initialOrdersFilters, OrdersPageFiltersType, OrdersSortKey, useOrdersPageStore } from "@/store/pages/orders.store";
import { ordersFiltersConfig } from "../../config/ordersFilters.config";

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