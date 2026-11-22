import { OrderListItemType } from "@/data/orders_old";

export const useOrderActionHandlers = (
    order: OrderListItemType
) => {
    const handleAccept = () => console.log("accept");
    const handleDecline = () => console.log("decline");
    const handleRealize = () => console.log("realize");
    const handleComplete = () => console.log("complete");

    return {
        accept: handleAccept,
        decline: handleDecline,
        realize: handleRealize,
        complete: handleComplete
    }
}