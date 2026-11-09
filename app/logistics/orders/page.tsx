"use client"

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { LuShoppingBag } from "react-icons/lu";
import { useModalStore } from "@/store/modals";
import { OrdersList } from "@/components/features/logistics/components/orders/OrdersList";
import { Select } from "@/components/ui/controls/inputs/Select";
import { useOrdersPageStore } from "@/store/pages/orders.store";
import { OrderStatus } from "@/data/orders_old";
import { OrdersListTabs } from "@/components/ui/controls/TabSwitch";
import { useAuth } from "@/providers/auth.provider";
import { getOrdersRole } from "@/components/features/logistics/config/orderTabs.config";
import { ordersPageTitle } from "@/components/features/logistics/config/title.config";

export default function OrdersPage() {

    const { openModal } = useModalStore();
    const { user } = useAuth();
    const { setFilters, filters } = useOrdersPageStore();

    const role = getOrdersRole(user?.roleNames);
    const pageTitleProps = ordersPageTitle[role];

    const handleOpenCreateOrderModal = () => {
        openModal("createOrder");
    }

    return (
        <Column Start className="w-full h-full gap-4">
            <Row CenterBetween className="w-full py-10">
                <Title { ...pageTitleProps } />
                <IconButton
                    Icon={LuShoppingBag}
                    iconColor="#ffffffaa"
                    onClick={handleOpenCreateOrderModal}
                    className="bg-indigo-500/60 text-white/80"
                >
                    Create order
                </IconButton>
            </Row>
            <Row CenterBetween className="w-full">
                <OrdersListTabs />

            </Row>

            <OrdersList />
        </Column>
    )
}




