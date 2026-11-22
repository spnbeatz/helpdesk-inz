import { createPageStore } from "@/store/factories/createPageStore";
import { UsersPageFiltersType } from "../types/filters.types";
import { initialUsersFilters } from "../constants/filters.const";

export const useSettingsUserPageStore =
    createPageStore<UsersPageFiltersType>(({
        initialFilters: initialUsersFilters
    }))
