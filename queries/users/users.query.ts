import { searchUserList } from "@/api/services/users.service"
import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/api";
import { UsersPageFiltersType } from "@/components/features/settings/users/types/filters.types";

export const useSearchUsers = (filter: UsersPageFiltersType) => {
    return useQuery({
        queryKey: ["users", filter],
        queryFn: () => usersService.getSettingsUsersList(filter),
        enabled: !!filter.searchValue
    })
}