import { User, UserType } from "@/data/users";
import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";
import { createPageStore } from "@/store/factories/createPageStore";
import { createTableConfig } from "@/hooks/createTableConfig";
import { usersDefaultColumns, usersSettingsTableId } from "@/components/features/settings/users/config/userTableColumns";

export type UsersSortKey = keyof User;

export type UsersPageFiltersType =
    BaseFiltersType<UsersSortKey> &
    PaginationFiltersType & {
        status?: "active" | "inactive" | "blocked",
        locationId?: string[],
        roleNames?: string[],
        position?: string[],
        department?: string[]
    }

export type SettingsUsersPageType = {
    filters: UsersPageFiltersType
};

export const initialUsersFilters: UsersPageFiltersType = {
    sortBy: "lastName",
    sortDir: "asc",
    searchValue: "",
    page: 1,
    itemsPerPage: 22
}


export const useSettingsUserPageStore = 
    createPageStore<UsersPageFiltersType>(({
        initialFilters: initialUsersFilters
    }))

export const useUsersSettingsTableConfig =
    createTableConfig<User>(
        usersSettingsTableId,
        usersDefaultColumns
    )