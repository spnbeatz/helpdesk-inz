import { InventoryTableItemType } from "@/components/features/logistics/config/inventoryTableColumns";
import { BaseFiltersType } from "@/types/filters.types";
import { EquipmentStatus, EquipmentType } from "@/data/equipments";
import { createPageStore } from "../factories/createPageStore";

export type InventorySortKey = keyof InventoryTableItemType;

export type InventoryPageFiltersType =
    BaseFiltersType<InventorySortKey> & {
        userId?: string | null;
        type?: EquipmentType;
        status?: EquipmentStatus | "all";
        itemIds?: string[] | null;
        locationId?: string;
    };

export const useInventoryPageStore =
    createPageStore<InventoryPageFiltersType>({
        initialFilters: {
            sortBy: "name",
            sortDir: "asc",
            searchValue: "",
            status: "all"
        },
        itemsPerPage: 23
    });