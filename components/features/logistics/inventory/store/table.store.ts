import { createTableConfig } from "@/hooks/createTableConfig";
import { inventoryDefaultColumns, inventoryTableId, InventoryTableItemType } from "../config/table.config";

export const useInventoryTableConfig =
    createTableConfig<InventoryTableItemType>(
        inventoryTableId,
        inventoryDefaultColumns
    )