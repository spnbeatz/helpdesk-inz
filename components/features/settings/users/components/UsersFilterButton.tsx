import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { usersFiltersConfig } from "../config/filters.config";
import { UsersPageFiltersType, UsersSortKey } from "../types/filters.types";
import { useSettingsUserPageStore } from "../store/page.store";
import { initialUsersFilters } from "../constants/filters.const";

export const UsersFilterButton = () => {

    const { filters, setFilters } = useSettingsUserPageStore();

    return (
        <FilterPopover<UsersSortKey, UsersPageFiltersType>
            config={usersFiltersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={() => setFilters(initialUsersFilters)}
        />
    )
}