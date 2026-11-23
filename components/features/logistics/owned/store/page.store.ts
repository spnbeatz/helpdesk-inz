import { createPageStore } from "@/store/factories/createPageStore";
import { InventoryPageFiltersType } from "../../inventory/types/filters.types";
import { initialInventoryFilters } from "../../inventory/constants/filters.const";

export const useInventoryOwnedPageStore =
    createPageStore<InventoryPageFiltersType>({
        initialFilters: initialInventoryFilters
    })