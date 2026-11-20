import { EquipmentListItemType, ProductsFiltersType } from "@/api/services/logistics.service";
import { PaginatedResponse } from "@/api/types";
import { ProductType } from "@/data/products";
import { InventoryPageFiltersType } from "@/store/pages/inventory.store";

export interface ILogisticsService {
    getEquipment(id?: string): Promise<EquipmentListItemType | null>,

    getEquipmentList(
        filters?: InventoryPageFiltersType
    ): Promise<PaginatedResponse<EquipmentListItemType>>,
    
    getProduct(id?: string): Promise<ProductType | null>,

    getProductsList(
        filters: ProductsFiltersType
    ): Promise<ProductType[]>
    

}