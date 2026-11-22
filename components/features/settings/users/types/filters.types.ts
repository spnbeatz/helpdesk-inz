import { User } from "@/data/users";
import { BaseFiltersType, PaginationFiltersType } from "@/types/filters.types";

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