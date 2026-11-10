import { OrderDetailsView } from "../../types/orderTabs.types";

import { useAuth } from "@/providers/auth.provider";
import { useState } from "react";

import { getRoleName } from "@/components/features/users/helpers/getRoleName";
import { orderDetailsTabConfig } from "../../../config/orderTabs.config";

import { OrderDetailsActivityTab } from "./OrderDetailsActivityTab";
import { OrderDetailsDocumentsTab } from "./OrderDetailsDocumentsTab";
import { OrderDetailsOverviewTab } from "./OrderDetailsOverviewTab";
import { OrderDetailsProductsSourcingTab } from "./OrderDetailsProductsSourcingTab";
import { OrderDetailsProductsTab } from "./OrderDetailsProductsTab";
import { Column, Row } from "@/components/ui/layout/flex";
import { TabSwitch } from "@/components/ui/controls/TabSwitch";

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
    const role = getRoleName(user?.roleNames);
    const tabs = orderDetailsTabConfig[role];

    const [selectedTab, setSelectedTab] = useState<OrderDetailsView>(tabs[0].id);

    const activeTab =
        tabs.find(tab => tab.id === selectedTab) ?? tabs[0];

    const Component = tabComponents[activeTab.id];


    return (
        <Column Start className="w-full gap-4 h-full">
            <Row CenterBetween>
                <TabSwitch
                    tabs={tabs}
                    activeTabValue={selectedTab}
                    onChange={(v) => setSelectedTab(v)}
                />
            </Row>
            {Component && <Component/>}
        </Column>

    )
}