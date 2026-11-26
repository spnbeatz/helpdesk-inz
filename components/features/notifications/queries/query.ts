import { notificationsService } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useNotificationsHistory = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: () => notificationsService.getHistory()
    })
}