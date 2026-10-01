import { searchUserList } from "@/api/services/users.service"
import { useQuery } from "@tanstack/react-query"

export const useSearchUsers = (searchValue: string) => {
    return useQuery({
        queryKey: ["users", searchValue],
        queryFn: () => searchUserList(searchValue),
        enabled: !!searchValue
    })
}