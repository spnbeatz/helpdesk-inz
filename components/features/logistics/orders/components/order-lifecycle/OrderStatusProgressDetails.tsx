"use client"

import { useEffect } from "react";
import { User } from "@/components/features/users/components/User";
import { Column } from "@/components/ui/layout/flex";
import { Description } from "@heroui/react";
import { formatRelativeDate } from "@/utils/date..util";
import { OrderHistoryType } from "@/data/orders/types";

export const OrderStatusProgressDetails = ({ statusDetails }: { statusDetails: OrderHistoryType }) => {
    useEffect(() => console.log(statusDetails), [])
    return (
        <Column Start className="gap-1 ml-4 mb-4">
            <User
                source={statusDetails.changed_by?.avatarUrl || undefined}
                name={statusDetails.changed_by?.name}
                description={formatRelativeDate(statusDetails.created_at)}
                size="small"
            />
            <Description>{statusDetails.comment}</Description>
        </Column>
    )
}