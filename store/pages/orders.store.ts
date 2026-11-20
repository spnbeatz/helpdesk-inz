import {
    OrderCreateType,
    OrderWithAssignmentType,
    OrderStatus,
    OrderListViewType
} from "@/data/orders/types";

import { OrdersView } from "@/components/features/logistics/components/types/orderTabs.types";

import {
    BaseFiltersType,
    DateRangeFiltersType,
    PaginationFiltersType
} from "@/types/filters.types";

import { createPageStore } from "../factories/createPageStore";
import { createTableConfig } from "@/hooks/createTableConfig";
import { ordersDefaultColumns } from "@/components/features/logistics/config/ordersTableColumns.config";

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

type OrdersExtraState = {
    createData: OrderCreateType;
    setCreateData: (data: Partial<OrderCreateType>) => void;
};

export const initialOrdersFilters: OrdersPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    status: "all",
    itemsPerPage: 25,
    page: 1
}

export const useOrdersPageStore =
    createPageStore<OrdersPageFiltersType, OrdersExtraState>(
        { initialFilters: initialOrdersFilters },
        (set) => ({
            createData: {
                products: [],
                reason: "",
                ticket_id: "",
                created_by_id: ""
            },

            setCreateData: (newData) =>
                set((state) => ({
                    createData: {
                        ...state.createData,
                        ...newData
                    }
                }))
        })
    );

export const useOrdersTableConfig =
    createTableConfig<OrderListViewType>(
        "orders",
        ordersDefaultColumns,
        "list"
    )