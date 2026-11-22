
import { useOrdersPageStore } from "../store/page.store";
import { useOrdersTableConfig } from "../store/table.store";
import { ordersTableColumns } from "../config/table.config";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";

export const OrdersSettingsPopover = createSettingsPopover(
    useOrdersPageStore,
    useOrdersTableConfig,
    ordersTableColumns
)