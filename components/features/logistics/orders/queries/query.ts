import { useQuery } from "@tanstack/react-query";
import { OrdersPageFiltersType } from "../types/filters.types";
import { useAuth } from "@/providers/auth.provider";
import { ordersService } from "@/api";
import { getRoleName } from "@/components/features/users/helpers/getRoleName";

export const useOrdersList = (
    filter: OrdersPageFiltersType = {}
) => {
    const { user } = useAuth();

    const role = getRoleName(user?.roleNames);

    return useQuery({
        queryKey: [
            "orders",
            user?.id,
            role,
            filter
        ],

        enabled: !!user,

        queryFn: () => {
            if (!user) throw new Error("Unauthorized");

             const orders = ordersService.getOrderList(filter, {
                id: user.id,
                role
            });

            return orders;
        }
    });
};

export const useOrder = (orderId: string) => {
    const { user } = useAuth();

    const role = getRoleName(user?.roleNames);
    return useQuery({
        queryKey: ["order", orderId, user?.id, role],
        enabled: Boolean(orderId && user),
        queryFn: () => {
            if (!user) throw new Error("Unauthorized");
            return ordersService.getOrder(orderId, { id: user.id, role})
        },
        
    })
}