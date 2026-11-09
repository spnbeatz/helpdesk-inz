import { OrderDetailViewType } from "@/data/orders/types";
import { OrdersRole } from "../components/types/orderTabs.types";
import { formatRelativeDate } from "@/utils/date..util";

export type PageTitleType = {
    title: string,
    description?: string
}

export type OrdersPageTypeTitle = Record<OrdersRole, PageTitleType>


export const ordersPageTitle: OrdersPageTypeTitle = {
    Administrator: {
        title: "Orders", 
        description: "Overview of company equipment requests"
    },
    Manager: {
        title: "Orders / Approval queue",
        description: "Review new requests and assign fulfillment technician"
    },
    Technician: { 
        title: "Orders / My workspace", 
        description: "Orders I created and orders assigned to me"
    },
    User: {
        title: "My equipment requests", 
        description: "Read-only status for equipment related to my tickets" 
    }
}

export const orderPageDetailsTitle= (order?: OrderDetailViewType | null): PageTitleType  => {
    if(!order) return { title: "No order"}
    return {
        title: `Order ${order.id}`,
        description: `Related ticket ${order.ticket_id} - Created at ${formatRelativeDate(order.created_at)}`
    }
}