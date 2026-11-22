"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { OrdersList } from "@/components/features/logistics/orders/components/OrdersList";
import { useOrdersPageStore } from "@/components/features/logistics/orders/store/page.store";
import { OrdersListTabs } from "@/components/features/logistics/orders/components/OrderListTabs";
import { useAuth } from "@/providers/auth.provider";
import { getRoleName } from "@/components/features/users/helpers/getRoleName";
import { ordersPageTitle } from "@/components/features/logistics/orders/config/title.config";
import { useCallback, useEffect } from "react";
import { OrdersTable } from "@/components/features/logistics/orders/components/OrdersTable";
import { OrdersFilterButton } from "@/components/features/logistics/orders/components/OrdersFilterButton";
import { OrdersSettingsPopover } from "@/components/features/logistics/orders/components/OrdersSettingsPopover";
import { TableView } from "@/components/composed/table/TableView";
import { ordersTableId } from "@/components/features/logistics/orders/config/table.config";
import { OrderAddButton } from "@/components/features/logistics/orders/components/OrderAddButton";

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




