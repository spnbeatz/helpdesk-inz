import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { inventoryFiltersConfig } from "../../inventory/config/filters.config";

import { initialInventoryFilters } from "../../inventory/constants/filters.const";
import { InventoryPageFiltersType, InventorySortKey } from "../../inventory/types/filters.types";
import { useInventoryOwnedPageStore } from "../store/page.store";

import { SearchUser } from "@/components/features/users/components/SearchUsers/SearchUsers";
import { useAuth } from "@/providers/auth.provider";
import { useCallback } from "react";

export const OwnedEquipmentFilterButton = () => {

    const { filters, setFilters } = useInventoryOwnedPageStore();
    const { user } = useAuth();

    const onClear = useCallback(() => {
        setFilters({...initialInventoryFilters, userId: user?.id })
    }, [setFilters])

    return (
        <FilterPopover<InventorySortKey, InventoryPageFiltersType>
            config={inventoryFiltersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={onClear}
        >
        </FilterPopover>
    )
}