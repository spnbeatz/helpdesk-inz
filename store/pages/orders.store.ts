import {
    OrderCreateType,
    OrderWithAssignmentType,
    OrderStatus
} from "@/data/orders/types";

import { OrdersView } from "@/components/features/logistics/components/types/orderTabs.types";

import {
    BaseFiltersType,
    DateRangeFiltersType,
    PaginationFiltersType
} from "@/types/filters.types";

import { createPageStore } from "../factories/createPageStore";

type OrdersSortKey = keyof OrderWithAssignmentType;

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

export const useOrdersPageStore =
    createPageStore<OrdersPageFiltersType, OrdersExtraState>(
        {
            initialFilters: {
                sortBy: "created_at",
                sortDir: "desc",
                searchValue: "",
                status: "all",
            },
            itemsPerPage: 20
        },
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