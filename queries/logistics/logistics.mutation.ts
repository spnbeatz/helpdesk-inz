import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderCreateType, OrderWithProductsType } from "@/data/orders/types"
import { ordersService } from "@/api";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<OrderWithProductsType, Error, OrderCreateType>({
        mutationFn: ordersService.createOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            });
        },

        onError: (error) => {
            console.error("Error creating order:", error);
        }
    });
};