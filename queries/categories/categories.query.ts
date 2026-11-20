
import { useQuery } from "@tanstack/react-query"
import { categoriesService } from "@/api"

export const useCategotyList = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoriesService.getCategoryList
    })
}