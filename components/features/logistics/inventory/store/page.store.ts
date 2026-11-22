import { createPageStore } from "@/store/factories/createPageStore";
import { initialInventoryFilters } from "../constants/filters.const";
import { InventoryPageFiltersType } from "../types/filters.types";

export const useInventoryPageStore =
    createPageStore<InventoryPageFiltersType>({
        initialFilters: initialInventoryFilters
    });