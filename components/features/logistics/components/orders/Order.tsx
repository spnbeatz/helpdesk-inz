"use client"

import { OrderListItemType } from "@/data/orders_old";
import { formatRelativeDate } from "@/utils/date..util";
import { Column, FlexProps, Row } from "@/components/ui/layout/flex";
import { User } from "@/components/features/users/components/User";
import { Description, Label } from "@heroui/react";
import { truncateText } from "@/utils/string.util";
import { ProductChip } from "./ProductChip";
import { TicketChip } from "./TicketChip";
import { ReviewOrderInfo } from "./ReviewOrderInfo";
import { OrderStatusChip } from "./OrderStatusChip";
import { useModalStore } from "@/store/modals";
import { useRouter } from "next/navigation";
import { useAccess } from "@/providers/access.provider";

export const Order = ({ order }: { order: OrderListItemType }) => {
    const { openModal } = useModalStore();
    const router = useRouter();

    const { hasRole } = useAccess();

    const routeToOrderDetails = () => {
        router.push("/logistics/orders/" + order.id)
    }

    return (
        <Column
            Start
            className="p-6 shadow-sm rounded-lg bg-white/60 gap-2 relative"
            onClick={routeToOrderDetails}
        >
            <Row CenterBetween className="w-full">
                {hasRole(["Administrator", "Manager", "User"]) ? (
                    <User
                        source={order.createdBy?.avatarUrl}
                        name={order.createdBy?.name}
                        description={formatRelativeDate(order.created_at)}
                    />
                ) : (
                    <Description>{formatRelativeDate(order.created_at)}</Description>
                )}

                <Row Center>
                    <OrderStatusChip status={order.status} />
                </Row>

            </Row>
            <Row CenterBetween className="gap-4 w-full">
                <Label className="font-normal text-black/80">{truncateText(order.reason, 80)}</Label>

            </Row>

            <Row EndBetween className="w-full">
                <ReviewOrderInfo order={order} />
                <Row Start className="flex-wrap gap-2 ml-auto">
                    <TicketChip ticketId={order.ticket_id} />
                    {order.products.map((product) => (
                        <ProductChip product={product} />
                    ))}
                </Row>
            </Row>

        </Column>
    )
}