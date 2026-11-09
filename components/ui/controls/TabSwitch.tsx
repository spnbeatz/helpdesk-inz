"use client"

import { useAuth } from "@/providers/auth.provider"
import { Column, Row } from "../layout/flex"
import { getOrdersRole, orderDetailsTabConfig, ordersTabsByRole } from "@/components/features/logistics/config/orderTabs.config"
import { OrdersPageFiltersType, useOrdersPageStore } from "@/store/pages/orders.store"
import { useState } from "react"
import { OrderDetailsView, OrdersTabConfig, OrdersView } from "@/components/features/logistics/components/types/orderTabs.types"
import { OrderDetailViewType } from "@/data/orders/types"
import { OrderLifecycle } from "@/components/features/logistics/components/orders/OrderLifecycle"
import { Grid } from "../layout/Grid"
import { OrderDetails } from "@/components/features/logistics/components/orders/OrderDetails"

export type Tabs = {
    name: string,
    value: string
}

export const TabSwitch = ({
    tabs,
    activeTabValue,
    onChange
}: {
    tabs: Tabs[],
    activeTabValue: string,
    onChange: (value: string) => void
}) => {
    return (
        <div className=" p-1 rounded-lg bg-white/40 shadow-sm h-9">
            <Row Center className="h-full">
                {tabs.map((tab, index) => {

                    return (
                        <div key={tab.name} className={`
                        h-full px-4 whitespace-nowrap text-black/60
                        shadow-muted flex justify-center items-center text-xs cursor-pointer
                        ${activeTabValue === tab.value ? "bg-indigo-400/60 rounded-lg text-white" : ""}
                        `}
                            onClick={() => onChange(tab.value)}
                        >
                            {tab.name}
                        </div>
                    )
                })}
            </Row>
        </div>
    )
}

export const UserSwitch = () => {
    const { activeLoggedUser, setActiveLoggedUser } = useAuth();
    return (
        <TabSwitch
            tabs={[
                { name: "Admin", value: "USR-001" },
                { name: "Technician", value: "USR-002" },
                { name: "Manager", value: "USR-004"},
                { name: "User", value: "USR-005" }
            ]}
            activeTabValue={activeLoggedUser}
            onChange={(value) => setActiveLoggedUser(value)}
        />

    )
}

export type TabConfig<T extends string> = {
    id: T;
    label: string;
};

type TabSwitchNewProps<T extends string> = {
    tabs: TabConfig<T>[];
    activeTabValue: T;
    onChange: (value: T) => void;
};

export const TabSwitchNew = <T extends string,>({
    tabs,
    activeTabValue,
    onChange
}: TabSwitchNewProps<T>) => {
    return (
        <div className="p-1 rounded-lg bg-white/40 shadow-sm h-9">
            <Row Center className="h-full">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`
                            h-full px-4 whitespace-nowrap
                            text-black/60 shadow-muted
                            flex justify-center items-center
                            text-xs cursor-pointer
                            transition-colors duration-200
                            ${activeTabValue === tab.id
                                ? "bg-indigo-400/60 rounded-lg text-white font-semibold"
                                : "hover:bg-black/5 rounded-lg"
                            }
                        `}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </Row>
        </div>
    );
};

export const OrdersListTabs = () => {
    const { user } = useAuth();
    const { filters, setFilters } = useOrdersPageStore();

    const role = getOrdersRole(user?.roleNames);
    const tabs = ordersTabsByRole[role];


    return (
        <TabSwitchNew
            tabs={tabs}
            activeTabValue={filters.view || tabs[0].id}
            onChange={(value) => setFilters({ view: value as OrdersView })}
        />
    )

}

export const OrderDetailsOverviewTab = () => {
    return (
        <Grid cols={4} gap={2} className="w-full h-full">
            <OrderDetails />
            <OrderLifecycle />
        </Grid>
    )
}

export const OrderDetailsProductsTab = () => {
    return (
        <Column Start className="w-full h-10 bg-yellow-400">
            <div></div>
        </Column>
    )
}

export const OrderDetailsProductsSourcingTab = () => {
    return (
        <Column Start className="w-full h-10 bg-red-300">
            <div></div>
        </Column>
    )
}

export const OrderDetailsActivityTab = () => {
    return (
        <Column Start className="w-full h-10 bg-blue-400">
            <div></div>
        </Column>
    )
}

export const OrderDetailsDocumentsTab = () => {
    return (
        <Column Start className="w-full h-10 bg-purple-400">
            <div></div>
        </Column>
    )
}

const tabComponents: Record<
    OrderDetailsView,
    React.ComponentType
> = {
    overview: OrderDetailsOverviewTab,
    "products-sourcing": OrderDetailsProductsSourcingTab,
    activity: OrderDetailsActivityTab,
    documents: OrderDetailsDocumentsTab,
    products: OrderDetailsProductsTab
};

export const OrderDetailsTabs = () => {
    const { user } = useAuth();
    const role = getOrdersRole(user?.roleNames);
    const tabs = orderDetailsTabConfig[role];

    const [selectedTab, setSelectedTab] = useState<OrderDetailsView>(tabs[0].id);

    const activeTab =
        tabs.find(tab => tab.id === selectedTab) ?? tabs[0];

    const Component = tabComponents[activeTab.id];


    return (
        <Column Start className="w-full gap-4 h-full">
            <Row CenterBetween>
                <TabSwitchNew
                    tabs={tabs}
                    activeTabValue={selectedTab}
                    onChange={(v) => setSelectedTab(v)}
                />
            </Row>
            {Component && <Component/>}
        </Column>

    )
}



