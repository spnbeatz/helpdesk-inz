import { getEquipment, getEquipmentAssigmentsList, getEquipmentList, getInventoryProduct, getProduct } from "@/api/services/logistics.service"
import { getOrder, getOrdersList } from "@/api/services/orders.service"
import { InventoryPageFiltersType } from "@/store/pages/inventory.store"
import { OrdersPageFiltersType } from "@/store/pages/orders.store"
import { useQuery } from "@tanstack/react-query"
import { ProductsFiltersType } from "@/api/services/logistics.service"
import { getProductsList } from "@/api/services/logistics.service";
import { useAuth } from "@/providers/auth.provider"
import { getOrdersRole } from "@/components/features/logistics/config/orderTabs.config"

export const useEquipmentList = (filter?: InventoryPageFiltersType) => {
    return useQuery({
        queryKey: ["equipments", filter],
        queryFn: () => {
            return getEquipmentList(filter)
        }
    })
}

export const useEquipment = (productId?: string) => {
    return useQuery({
        queryKey: ["equipment", productId],
        queryFn: () => getEquipment(productId),
        enabled: !!productId
    })
}

export const useProduct = (productId: string) => {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProduct(productId),
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

    const role = getOrdersRole(user?.roleNames);

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

            return getOrdersList(filter, {
                id: user.id,
                role
            });
        }
    });
};

export const useOrder = (orderId: string) => {
    const { user } = useAuth();

    const role = getOrdersRole(user?.roleNames);
    return useQuery({
        queryKey: ["order", orderId, user?.id, role],
        enabled: Boolean(orderId && user),
        queryFn: () => {
            if (!user) throw new Error("Unauthorized");
            return getOrder(orderId, { id: user.id, role})
        },
        
    })
}

export const useProductsList = (
    filters: ProductsFiltersType = {}
) => {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => getProductsList(filters)
    });
};

export const useEquipmentAssigmentsList = (eqId?: string) => {
    return useQuery({
        queryKey: ["eq_assigments", eqId],
        queryFn: () => getEquipmentAssigmentsList(eqId),
        enabled: !!eqId
    })
}