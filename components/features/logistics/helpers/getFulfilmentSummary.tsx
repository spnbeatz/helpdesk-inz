import { OrderItemDetailsType } from "@/data/orders/types";

export const getFulfillmentSummary = (item: OrderItemDetailsType) => {
    const ordered = item.quantity;

    const received = item.fulfillments.reduce(
        (total, fulfillment) => total + fulfillment.received_quantity,
        0
    );

    return {
        ordered,
        received,
        remaining: ordered - received,
        progress: (received / ordered) * 100
    };
};