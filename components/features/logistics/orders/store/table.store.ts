import { createTableConfig } from "@/hooks/createTableConfig";
import { ordersTableId, ordersDefaultColumns } from "../config/table.config";
import { OrderListViewType } from "@/data/orders/types";

export const useOrdersTableConfig =
    createTableConfig<OrderListViewType>(
        ordersTableId,
        ordersDefaultColumns,
        "list"
    )