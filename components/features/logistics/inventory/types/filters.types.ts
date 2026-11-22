import { InventoryTableItemType } from "../config/table.config";
import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";
import { EquipmentType, EquipmentStatus } from "@/data/equipments";

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