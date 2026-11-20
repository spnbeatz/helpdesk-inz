
import { useOrdersPageStore, useOrdersTableConfig } from "@/store/pages/orders.store"
import { ordersTableColumns } from "../../config/ordersTableColumns.config";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";

export const OrdersSettingsPopover = createSettingsPopover(
    useOrdersPageStore,
    useOrdersTableConfig,
    ordersTableColumns
)