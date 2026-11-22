
import { inventoryTableColumns } from "../config/table.config";
import { useInventoryPageStore } from "../store/page.store";
import { useInventoryTableConfig } from "../store/table.store";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";

export const ProductsListSettingsPopover = createSettingsPopover(
    useInventoryPageStore,
    useInventoryTableConfig,
    inventoryTableColumns
)