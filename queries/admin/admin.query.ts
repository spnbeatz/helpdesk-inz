
import { UsersPageFiltersType } from "@/store/pages/settings/users.store"
import { useQuery } from "@tanstack/react-query"
import { usersService } from "@/api"

export const useAdminSearchUserList = (filters: UsersPageFiltersType) => {
    return useQuery({
        queryKey: ["admin", filters],
        queryFn: () => usersService.getSettingsUsersList(filters)
    })
}