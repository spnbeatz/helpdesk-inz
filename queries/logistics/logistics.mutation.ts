import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/api/services/orders.service";
import { OrderCreateType, OrderWithProductsType } from "@/data/orders/types";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<OrderWithProductsType, Error, OrderCreateType>({
        mutationFn: createOrder,

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