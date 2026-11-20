"use client"

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { LuShoppingBag } from "react-icons/lu";
import { useModalStore } from "@/store/modals";
import { OrdersList } from "@/components/features/logistics/components/orders/OrdersList";
import { useOrdersPageStore } from "@/store/pages/orders.store";
import { OrdersListTabs } from "@/components/features/logistics/components/orders/OrderListTabs";
import { useAuth } from "@/providers/auth.provider";
import { getRoleName } from "@/components/features/users/helpers/getRoleName";
import { ordersPageTitle } from "@/components/features/logistics/config/title.config";
import { Search } from "@/components/ui/controls/inputs/Search";
import { useCallback, useEffect } from "react";
import { OrdersTable } from "@/components/features/logistics/components/orders/OrdersTable";
import { OrdersListControl } from "@/components/features/logistics/components/orders/OrdersListControl";
import { OrdersListLayoutSwitch } from "@/components/features/logistics/components/orders/OrdersListLayoutSwitch";
import { OrdersFilterButton } from "@/components/features/logistics/components/orders/OrdersFilterButton";
import { OrdersSettingsPopover } from "@/components/features/logistics/components/orders/OrdersSettingsPopover";

export default function OrdersPage() {

    const { openModal } = useModalStore();
    const setFilters = useOrdersPageStore(state => state.setFilters);
    const { user } = useAuth();

    const role = getRoleName(user?.roleNames);
    const pageTitleProps = ordersPageTitle[role];

    const handleOpenCreateOrderModal = () => {
        openModal("createOrder");
    }

    const handleSearch = useCallback((value: string) => {
        setFilters({ searchValue: value, page: 1 });
    }, [setFilters]);

    return (
        <Column Start className="w-full h-full gap-4">
            <Row CenterBetween className="w-full">
                <Title {...pageTitleProps} />
                
                <Row Center className="gap-2">
                    <OrdersListLayoutSwitch />
                    <Search onSearch={handleSearch} />
                    
                    <OrdersFilterButton />
                    <OrdersSettingsPopover/>
                    <IconButton
                        Icon={LuShoppingBag}
                        iconColor="#ffffffaa"
                        onClick={handleOpenCreateOrderModal}
                        className="bg-indigo-500/60 text-white/80"
                    >
                        Create order
                    </IconButton>
                </Row>

            </Row>
            <Row CenterBetween className="w-full">
                <OrdersListTabs />

            </Row>
            <OrdersListControl />
        </Column>
    )
}




