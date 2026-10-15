import { getRolesList } from "@/api/services/roles.service";
import { useQuery } from "@tanstack/react-query";

export const useRolesList = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: getRolesList
    })
}