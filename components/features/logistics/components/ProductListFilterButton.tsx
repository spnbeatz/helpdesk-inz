
import { FilterPopoverButton } from "../../../ui/controls/buttons/filterPopoverButton"

import { SearchUser } from "../../users/components/SearchUsers/SearchUsers";
import { useInventoryPageStore } from "@/store/pages/inventory.store";

export const ProductListFilterButton = () => {

    const { setFilters } = useInventoryPageStore();
    return (
        <FilterPopoverButton>
            <SearchUser onSelect={(userId) => setFilters({userId})} />
        </FilterPopoverButton>
    )
}
