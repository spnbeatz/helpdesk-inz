import { getEquipmentList, getInventoryProduct, getProduct } from "@/api/services/logistics.service"
import { getOrder, getOrdersList } from "@/api/services/orders.service"
import { InventoryPageFiltersType } from "@/store/pages/inventory.store"
import { OrdersPageFiltersType } from "@/store/pages/orders.store"
import { useQuery } from "@tanstack/react-query"
import { ProductsFiltersType } from "@/api/services/logistics.service"
import { getProductsList } from "@/api/services/logistics.service"

export const useEquipmentList = (filter?: InventoryPageFiltersType) => {
    return useQuery({
        queryKey: ["equipments", filter],
        queryFn: () => {
            return getEquipmentList(filter)
        }
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
        queryKey: ["equipment", productId ],
        queryFn: () => getInventoryProduct(productId),
        enabled: !!productId
    })
}

export const useOrdersList = (filter?: OrdersPageFiltersType) => {
    return useQuery({
        queryKey: ["orders", filter],
        queryFn: () => getOrdersList(filter),
    })
}

export const useOrder = (orderId: string) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrder(orderId),
        enabled: !!orderId
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