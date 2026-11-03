import { OrderListItemType } from "@/data/orders_old";
import { OrderActionsProvider } from "../../context/orderActions.context";
import { Row } from "@/components/ui/layout/flex";
import { OrderActionButton } from "./OrderActionButton";

export const OrderActions = ({
    order
}: {
    order: OrderListItemType;
}) => (
    <OrderActionsProvider item={order}>
        <Row Center className="gap-2">
            <OrderActionButton action="accept" />
            <OrderActionButton action="decline" />
            <OrderActionButton action="realize" />
            <OrderActionButton action="complete" />
        </Row>
    </OrderActionsProvider>
);