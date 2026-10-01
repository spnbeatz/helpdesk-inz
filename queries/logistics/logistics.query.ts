import { getEquipmentList, getInventoryProduct } from "@/api/services/logistics.service"
import { InventoryPageFiltersType } from "@/store/pages/inventory.store"
import { useQuery } from "@tanstack/react-query"

export const useEquipmentList = (filter?: InventoryPageFiltersType) => {
    return useQuery({
        queryKey: ["equipments", filter],
        queryFn: () => {
            return getEquipmentList(filter)
        }
    })
}

export const useInventoryProduct = (productId: string) => {
    return useQuery({
        queryKey: ["equipment", productId ],
        queryFn: () => getInventoryProduct(productId),
        enabled: !!productId
    })
}