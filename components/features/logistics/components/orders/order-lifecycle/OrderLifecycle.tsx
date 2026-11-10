import { Section } from "@/components/ui/surfaces/Section";
import { useOrderDetails } from "../../../context/OrderDetailsProvider";
import { Column } from "@/components/ui/layout/flex";
import { OrderStatusProgress } from "./OrderStatusProgress";;
import { OrderNextStatusTip } from "../OrderNextStatusTip";


export const OrderLifecycle = () => {
    const { order } = useOrderDetails();
    return (
        <Section title="Order lifecycle" className="bg-white rounded-lg shadow-sm 
        p-6 col-span-1 gap-4">
            <Column StartBetween className="h-full w-full">
                <OrderStatusProgress history={order?.history} />
                <OrderNextStatusTip />
            </Column>

        </Section>

    )
}
