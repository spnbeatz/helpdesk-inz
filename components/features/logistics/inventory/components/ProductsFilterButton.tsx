import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { inventoryFiltersConfig } from "../config/filters.config";

import { initialInventoryFilters } from "../constants/filters.const";
import { InventoryPageFiltersType, InventorySortKey } from "../types/filters.types";
import { useInventoryPageStore } from "../store/page.store";

import { SearchUser } from "@/components/features/users/components/SearchUsers/SearchUsers";

export const ProductsFilterButton = () => {

    const { filters, setFilters } = useInventoryPageStore();

    return (
        <FilterPopover<InventorySortKey, InventoryPageFiltersType>
            config={inventoryFiltersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={() => setFilters(initialInventoryFilters)}
        >
            <SearchUser onSelect={(userIds) => {
                console.log(userIds, "userIds")
                setFilters({ userIds })
                }}
            />
        </FilterPopover>
    )
}