import { FilterConfig } from "@/components/composed/filters/types";
import { UsersPageFiltersType, UsersSortKey } from "../types/filters.types";

export const usersFiltersConfig: FilterConfig<UsersPageFiltersType, UsersSortKey> = {
    sortOptions: [
        { value: "lastName", label: "Last Name"},
        { value: "firstName", label: "First Name"},
        { value: "email", label: "Email"},
        { value: "createdAt", label: "Created date"},
        { value: "lastLoginAt", label: "Last login date"},
    ],
    filters: [
        {
            key: "status",
            label: "Status",
            type: "select",
            options: []
        },
        {
            key: "locationId",
            label: "Location",
            type: "multi-select"
        },
        {
            key: "position",
            label: "Position",
            type: "multi-select"
        },
        {
            key: "roleNames",
            label:"Role",
            type:"multi-select"
        },
        {
            key: "department",
            label: "Department",
            type: "multi-select"
        }
    ]
}