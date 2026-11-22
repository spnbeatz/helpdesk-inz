import { getEquipmentAssigmentsList, getInventoryProduct } from "@/api/services/logistics.service"
import { InventoryPageFiltersType } from "../types/filters.types"
import { useQuery } from "@tanstack/react-query"
import { ProductsFiltersType } from "@/api/services/logistics.service"
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