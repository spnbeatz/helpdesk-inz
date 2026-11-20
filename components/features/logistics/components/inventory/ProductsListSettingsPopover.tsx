
import { inventoryTableColumns } from "../../config/inventoryTableColumns";
import { useInventoryPageStore, useInventoryTableConfig } from "@/store/pages/inventory.store";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";

export const ProductsListSettingsPopover = createSettingsPopover(
    useInventoryPageStore,
    useInventoryTableConfig,
    inventoryTableColumns
)