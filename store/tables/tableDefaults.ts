import type { InventoryTableItemType } from "@/components/features/logistics/config/inventoryTableColumns";
import { User } from "@/data/users";

export const inventoryDefaultColumns: (keyof InventoryTableItemType)[] = [
    "id",
    "assetTag",
    "name",
    "model",
    "manufacturer",
    "serialNumber",
    "assignedTo",
];

export const usersDefaultColumns: (keyof User)[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "locationName",
    "position",
    "createdAt",
    "lastLoginAt",
    "roleNames"
];