import { getPriorityList } from "@/api/services/priorities.service"
import { useQuery } from "@tanstack/react-query"

export const usePriorityList = () => {
    return useQuery({
        queryKey: ["priorities"],
        queryFn: getPriorityList
    })
}