import { OrderListItemType } from "@/data/orders_old";
import { Row } from "@/components/ui/layout/flex";
import { LuCornerDownRight, LuDot } from "react-icons/lu";
import { Description } from "@heroui/react";
import { User } from "@/components/features/users/components/User";
import { truncateText } from "@/utils/string.util";
import { formatRelativeDate } from "@/utils/date..util";

export const ReviewOrderInfo = ({ order }: { order: OrderListItemType }) => {
    if (!order.reviewedBy) return null;
    return (
        <Row Start className="gap-2 mt-auto">
            <LuCornerDownRight className="text-black/60 text-sm mt-1" />
            <Row CenterStart>
                <User
                    source={order.reviewedBy?.avatarUrl}
                    name={order.reviewedBy?.name}
                    size="small"
                />
                {order.feedback && <Description className="ml-1">{truncateText(order.feedback, 70)}</Description>}
                <LuDot className="text-black/40"/>
                <Description>{order.reviewed_at ? formatRelativeDate(order.reviewed_at) : undefined}</Description>
            </Row>


        </Row>
    )
}