import { inventoryTableId, InventoryTableItemType } from "@/components/features/logistics/config/inventoryTableColumns";
import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";
import { EquipmentStatus, EquipmentType } from "@/data/equipments";
import { createPageStore } from "../factories/createPageStore";
import { createTableConfig } from "@/hooks/createTableConfig";
import { inventoryDefaultColumns } from "@/components/features/logistics/config/inventoryTableColumns";

export type InventorySortKey = keyof InventoryTableItemType;

export type InventoryPageFiltersType =
    BaseFiltersType<InventorySortKey> &
    PaginationFiltersType & {
        userId?: string | null,
        userIds?: string[] | null;
        type?: EquipmentType;
        status?: EquipmentStatus | "all";
        itemIds?: string[] | null;
        locationId?: string;

    };

export const initialInventoryFilters: InventoryPageFiltersType = {
    sortBy: "name",
    sortDir: "asc",
    searchValue: "",
    status: "all",
    page: 1,
    itemsPerPage: 25,
    userIds: [],
    userId: undefined
}

export const useInventoryPageStore =
    createPageStore<InventoryPageFiltersType>({
        initialFilters: initialInventoryFilters
    });

export const useInventoryTableConfig =
    createTableConfig<InventoryTableItemType>(
        inventoryTableId,
        inventoryDefaultColumns
    )