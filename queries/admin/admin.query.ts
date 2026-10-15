import { adminSearchUserList } from "@/api/services/users.service"
import { useQuery } from "@tanstack/react-query"

export const useAdminSearchUserList = (searchValue: string) => {
    return useQuery({
        queryKey: ["admin", searchValue],
        queryFn: () => adminSearchUserList(searchValue)
    })
}