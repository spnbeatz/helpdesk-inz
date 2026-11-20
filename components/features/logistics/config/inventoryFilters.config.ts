import { FilterConfig } from "@/components/composed/filters/types";
import { InventoryPageFiltersType, InventorySortKey } from "@/store/pages/inventory.store";

export const inventoryFiltersConfig: FilterConfig<InventoryPageFiltersType, InventorySortKey> = {
    sortOptions: [
        { value: "name", label: "Name" },
        { value: "model", label: "Model"},
        { value: "purchaseDate", label: "Purchase date"},
        { value: "warrantyUntil", label: "Warranty until"},
    ],
    filters: []
}