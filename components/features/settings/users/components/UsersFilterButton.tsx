import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { usersFiltersConfig } from "../config/usersFilters.config";
import {
    UsersPageFiltersType,
    UsersSortKey,
    useSettingsUserPageStore,
    initialUsersFilters
} from "@/store/pages/settings/users.store";

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