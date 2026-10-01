import { Equipment } from "@/data/equipments";
import { create } from "zustand";

export type InventorySortKey = keyof Equipment | "quantity";

export type InventoryPageFiltersType = {
    sortBy?: InventorySortKey;
    sortDir?: "asc" | "desc";
    userId?: string | null;
    type?: string;
    searchValue?: string;
    status?: string;
    isInventory?: boolean;
};

type InventoryPageType = {
    filters: InventoryPageFiltersType;
    setFilters: (filters: Partial<InventoryPageFiltersType>) => void;
    itemsPerPage: number;
};

export const useInventoryPageStore = create<InventoryPageType>((set) => ({
    filters: {
        sortBy: "name",
        sortDir: "asc",
        userId: null,
        type: undefined,
        searchValue: "",
        status: undefined,
        isInventory: true,
    },

    setFilters: (newFilters) =>
        set((state) => ({
            filters: {
                ...state.filters,
                ...newFilters,
            },
        })),

    itemsPerPage: 13,
}));