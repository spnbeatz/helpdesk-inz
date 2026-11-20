import { OrderCreateType, OrderDetailsType, OrderListViewType, OrderWithProductsType } from "@/data/orders/types";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { IOrdersService } from "../interfaces/services/orders.interface";

import { 
    createOrder as createOrder_old,
    ExtendedOrdersPageFiltersType,
    getOrder as getOrder_old,
    getOrdersList as getOrderList_old,
    OrdersActor
 } from "../services/orders.service";
import { PaginatedResponse } from "../types";

export class OrdersService implements IOrdersService {

    private endpoint: string = "/orders"

    constructor(
        private readonly api: IApiClient
    ){}

    async createOrder(data: OrderCreateType): Promise<OrderWithProductsType> {
        return await createOrder_old(data);
    }

    async getOrder(id: string, actor: OrdersActor): Promise<OrderDetailsType | null> {
        return getOrder_old(id, actor);
    }

    async getOrderList(filter: ExtendedOrdersPageFiltersType, actor: OrdersActor): Promise<PaginatedResponse<OrderListViewType>> {
        return getOrderList_old(filter, actor);
    }
}