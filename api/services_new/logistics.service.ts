import { InventoryPageFiltersType } from "@/store/pages/inventory.store";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { ILogisticsService } from "../interfaces/services/logistics.interface";
import { EquipmentListItemType, ProductsFiltersType } from "../services/logistics.service";
import { PaginatedResponse } from "../types";


import { 
    getEquipmentList as getEquipmentList_old,
    getEquipment as getEquipment_old,
    getProduct as getProduct_old,
    getProductsList as getProductList_old
 } from "../services/logistics.service";
import { ProductType } from "@/data/products";

export class LogisticsService implements ILogisticsService {

    private endpoint: string = "/logistics"

    constructor(
        private readonly api: IApiClient
    ) { }

    async getEquipment(id?: string): Promise<EquipmentListItemType | null> {
        return getEquipment_old(id);
    }

    async getEquipmentList(filters?: InventoryPageFiltersType): Promise<PaginatedResponse<EquipmentListItemType>> {
        return getEquipmentList_old(filters)
    }

    async getProduct(id?: string): Promise<ProductType | null> {
        if(!id) return null;
        return getProduct_old(id);
    }

    async getProductsList(filters: ProductsFiltersType): Promise<ProductType[]> {
        return getProductList_old(filters);
    }


}