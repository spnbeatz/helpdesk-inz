"use client";

import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { orderPageDetailsTitle } from "@/components/features/logistics/config/title.config";
import { BackButton } from "@/components/ui/controls/buttons/BackButton";
import { OrderDetailsTabs } from "@/components/ui/controls/TabSwitch";
import { OrderDetailsProvider, useOrderDetails } from "@/components/features/logistics/context/OrderDetailsProvider";
import { Button } from "@/components/ui/controls/buttons/Button";
import { useOrder } from "@/queries/logistics/logistics.query";
import { useModalStore } from "@/store/modals";
import { useAccess } from "@/providers/access.provider";



export default function OrderDetailsPage() {

    return (
        <OrderDetailsProvider>
            <Column Start className="w-full h-full">
                <BackButton />
                <OrderDetailsHeader />
                <OrderDetailsTabs />
            </Column>
        </OrderDetailsProvider>

    )
}

export const OrderDetailsHeader = () => {

    const { order } = useOrderDetails();
    const { hasRole } = useAccess();
    const title = orderPageDetailsTitle(order);

    return (
        <Row CenterBetween className="w-full py-10">
            <Title {...title} />
            {hasRole("Manager") && <OrderManagerActions />}
        </Row>
    )
}

export const OrderManagerActions = () => {
    const { orderId } = useOrderDetails();
    const { openModal } = useModalStore();

    const openApproveModal = () => {
        openModal("approveOrder", { id: orderId })
    }

    const openDeclineModal = () => {
        openModal("declineOrder", { id: orderId })
    }

    return (
        <Row Center className="gap-4">
            <Button variant="danger-soft" onClick={openDeclineModal}>Decline</Button>
            <Button className={"bg-indigo-400 text-white shadow-sm"} onClick={openApproveModal}>Approve</Button>
        </Row>
    )
}