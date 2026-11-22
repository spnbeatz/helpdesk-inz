
import { UsersPageFiltersType } from "../types/filters.types"
import { useQuery } from "@tanstack/react-query"
import { usersService } from "@/api"

export const useAdminSearchUserList = (filters: UsersPageFiltersType) => {
    return useQuery({
        queryKey: ["admin", filters],
        queryFn: () => usersService.getSettingsUsersList(filters)
    })
}