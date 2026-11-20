import { ExtendedOrdersPageFiltersType, OrdersActor } from "@/api/services/orders.service";
import { OrderCreateType, OrderDetailsType, OrderListViewType, OrderWithProductsType } from "@/data/orders/types";
import { PaginatedResponse } from "@/api/types";

export interface IOrdersService {
    createOrder(
        data: OrderCreateType
    ): Promise<OrderWithProductsType>,

    getOrder(
        id: string,
        actor: OrdersActor
    ): Promise<OrderDetailsType | null>,

    getOrderList(
        filter: ExtendedOrdersPageFiltersType,
        actor: OrdersActor
    ): Promise<PaginatedResponse<OrderListViewType>>
}