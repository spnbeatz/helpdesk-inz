import { FilterConfig } from "@/components/composed/filters/types";
import { OrdersPageFiltersType, OrdersSortKey } from "@/store/pages/orders.store";

export const ordersFiltersConfig: FilterConfig<OrdersPageFiltersType, OrdersSortKey> = {
    sortOptions: [
        { value: "created_at", label: "Created at"},
        { value: "reviewed_at", label: "Reviewed at"},
        { value: "reason", label: "Reason"},
        { value: "status", label: "Status"}
    ],
    filters: []
}