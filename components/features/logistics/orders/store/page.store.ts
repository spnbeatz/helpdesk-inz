import { createPageStore } from "@/store/factories/createPageStore";
import { OrdersPageFiltersType } from "../types/filters.types";
import { initialOrdersFilters } from "../constants/filters.const";
import { OrdersPageExtraState } from "../types/page.types";

export const useOrdersPageStore =
    createPageStore<OrdersPageFiltersType, OrdersPageExtraState>(
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
