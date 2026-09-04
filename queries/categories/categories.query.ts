import { getCategoryList } from "@/api/services/categories.service"
import { useQuery } from "@tanstack/react-query"

export const useCategotyList = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategoryList
    })
}