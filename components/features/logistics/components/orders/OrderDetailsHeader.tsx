import { useOrderDetails } from "../../context/OrderDetailsProvider";
import { useAccess } from "@/providers/access.provider";
import { orderPageDetailsTitle } from "../../config/title.config";
import { Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { OrderManagerActions } from "./OrderManagerActions";

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