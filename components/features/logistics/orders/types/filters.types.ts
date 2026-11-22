import { OrderWithAssignmentType, OrderStatus } from "@/data/orders/types";
import { OrdersView } from "./tabs.types";
import { BaseFiltersType, DateRangeFiltersType, PaginationFiltersType } from "@/types/filters.types";

export type OrdersSortKey = keyof OrderWithAssignmentType;

export type OrdersPageFiltersType =
    BaseFiltersType<OrdersSortKey> &
    DateRangeFiltersType &
    PaginationFiltersType & {
        view?: OrdersView;

        status?: OrderStatus | "all";

        createdById?: string;
        reviewedById?: string | null;
        recipientUserId?: string;
        fulfillmentTechnicianId?: string | null;

        ticketId?: string;
        productId?: string;
        orderId?: string;
    };