import { useOrdersTableConfig } from "@/store/pages/orders.store"
import { OrdersTable } from "./OrdersTable";
import { OrdersList } from "./OrdersList";

export const OrdersListControl = () => {

    const { layoutType } = useOrdersTableConfig();

    return layoutType === "list" ? (
        <OrdersTable />
    ) : (
        <OrdersList />
    )
}