import { Grid } from "@/components/ui/layout/Grid"
import { OrderDetails } from "../OrderDetails"
import { OrderLifecycle } from "../order-lifecycle/OrderLifecycle"

export const OrderDetailsOverviewTab = () => {
    return (
        <Grid cols={4} gap={2} className="w-full h-full">
            <OrderDetails />
            <OrderLifecycle />
        </Grid>
    )
}