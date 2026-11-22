import { OrderStatus } from "@/data/orders/types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    pending: "Pending",
    accepted: "Accepted",
    in_progress: "In Progress",
    completed: "Completed",
    declined: "Declined"
};

export const ORDER_NORMAL_PATH: OrderStatus[] = [
    "pending",
    "accepted",
    "in_progress",
    "completed",
];

export const ORDER_DECLINED_PATH: OrderStatus[] = [
    "pending",
    "declined",
];