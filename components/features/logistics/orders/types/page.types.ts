import { OrderCreateType } from "@/data/orders/types";

export type OrdersPageExtraState = {
    createData: OrderCreateType;
    setCreateData: (data: Partial<OrderCreateType>) => void;
};