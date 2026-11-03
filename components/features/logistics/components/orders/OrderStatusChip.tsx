import { IconType } from "react-icons";
import { OrderStatus } from "@/data/orders_old";
import { LuCheck, LuCheckCheck, LuX, LuClock, LuLoaderCircle } from "react-icons/lu";
import { BasicChip } from "@/components/ui/data-display/BasicChip";

type StatusProps = {
    name: string,
    color?: "normal" | "danger" | "green" | "yellow" | "white",
    Icon: IconType,
    textColor: string
}

const statusConfig: Record<OrderStatus, StatusProps> = {
    accepted: {
        name: "Accepted",
        color: "green",
        Icon: LuCheck,
        textColor: "text-black/60"
    },
    completed: {
        name: "Completed",
        color: "green",
        Icon: LuCheckCheck,
        textColor: "text-black/60"
    },
    declined: {
        name: "Declined",
        color: "danger",
        Icon: LuX,
        textColor: "text-black/60"
    },
    pending: {
        name: "Pending",
        color: "yellow",
        Icon: LuClock,
        textColor: "text-black/60"
    },
    in_progress: {
        name: "In progress",
        color: "normal",
        Icon: LuLoaderCircle,
        textColor: "text-black/60"
    }
};

export const OrderStatusChip = ({ status }: { status: OrderStatus }) => {
    const { name, color, Icon, textColor } = statusConfig[status];

    return (
        <BasicChip color={color}>
            <Icon className={textColor} />
            <span className={textColor}>{name}</span>
        </BasicChip>
    );
};