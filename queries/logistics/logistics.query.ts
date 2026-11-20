import { getEquipmentAssigmentsList, getInventoryProduct } from "@/api/services/logistics.service"
import { InventoryPageFiltersType } from "@/store/pages/inventory.store"
import { OrdersPageFiltersType } from "@/store/pages/orders.store"
import { useQuery } from "@tanstack/react-query"
import { ProductsFiltersType } from "@/api/services/logistics.service"
import { useAuth } from "@/providers/auth.provider"
import { getRoleName } from "@/components/features/users/helpers/getRoleName"
import { logisticsService, ordersService } from "@/api"

export const useEquipmentList = (filter?: InventoryPageFiltersType) => {
    return useQuery({
        queryKey: ["equipments", filter],
        queryFn: () => {
            return logisticsService.getEquipmentList(filter)
        }
    })
}

export const useEquipment = (productId?: string) => {
    return useQuery({
        queryKey: ["equipment", productId],
        queryFn: () => logisticsService.getEquipment(productId),
        enabled: !!productId
    })
}

export const useProduct = (productId: string) => {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => logisticsService.getProduct(productId),
        enabled: !!productId
    })
}

export const useInventoryProduct = (productId?: string) => {
    return useQuery({
        queryKey: ["equipment", productId],
        queryFn: () => getInventoryProduct(productId),
        enabled: !!productId
    })
}

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

export const useProductsList = (
    filters: ProductsFiltersType = {}
) => {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => logisticsService.getProductsList(filters)
    });
};

export const useEquipmentAssigmentsList = (eqId?: string) => {
    return useQuery({
        queryKey: ["eq_assigments", eqId],
        queryFn: () => getEquipmentAssigmentsList(eqId),
        enabled: !!eqId
    })
}