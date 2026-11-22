"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { OrdersList } from "@/components/features/logistics/components/orders/OrdersList";
import { useOrdersPageStore } from "@/store/pages/orders.store";
import { OrdersListTabs } from "@/components/features/logistics/components/orders/OrderListTabs";
import { useAuth } from "@/providers/auth.provider";
import { getRoleName } from "@/components/features/users/helpers/getRoleName";
import { ordersPageTitle } from "@/components/features/logistics/config/title.config";
import { useCallback, useEffect } from "react";
import { OrdersTable } from "@/components/features/logistics/components/orders/OrdersTable";
import { OrdersFilterButton } from "@/components/features/logistics/components/orders/OrdersFilterButton";
import { OrdersSettingsPopover } from "@/components/features/logistics/components/orders/OrdersSettingsPopover";
import { TableView } from "@/components/composed/table/TableView";
import { ordersTableId } from "@/components/features/logistics/config/ordersTableColumns.config";
import { OrderAddButton } from "@/components/features/logistics/components/orders/OrderAddButton";

export default function OrdersPage() {

    const setFilters = useOrdersPageStore(state => state.setFilters);
    const { user } = useAuth();

    const role = getRoleName(user?.roleNames);
    const pageTitleProps = ordersPageTitle[role];


    const onSearch = useCallback((value: string) => {
        setFilters({ searchValue: value, page: 1 });
    }, [setFilters]);

    return (
        <Column Start className="w-full h-full gap-4">
            <Title {...pageTitleProps} />
            <TableView 
                tableId={ordersTableId}
                leftContent={<OrdersListTabs/>}
                onSearch={onSearch}
                filterButton={<OrdersFilterButton/>}
                settingsButton={<OrdersSettingsPopover />}
                createButton={<OrderAddButton />}
                table={<OrdersTable/>}
                grid={<OrdersList />}
            />
        </Column>
    )
}




