"use client";

import { useAuth } from "@/providers/auth.provider";
import { useOrdersPageStore } from "@/store/pages/orders.store";

import { getRoleName } from "@/components/features/users/helpers/getRoleName";
import { ordersTabsByRole } from "../../config/orderTabs.config";

import { TabSwitch } from "@/components/ui/controls/TabSwitch";

import { OrdersView } from "../types/orderTabs.types";

export const OrdersListTabs = () => {
    const { user } = useAuth();
    const { filters, setFilters } = useOrdersPageStore();

    const role = getRoleName(user?.roleNames);
    const tabs = ordersTabsByRole[role];


    return (
        <TabSwitch
            tabs={tabs}
            activeTabValue={filters.view || tabs[0].id}
            onChange={(value) => setFilters({ view: value as OrdersView })}
        />
    )

}