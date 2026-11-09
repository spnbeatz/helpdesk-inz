"use client";

import { useOrdersPageStore } from "@/store/pages/orders.store";
import { ScrollShadow } from "@heroui/react";
import { Grid } from "@/components/ui/layout/Grid";
import { useOrdersList } from "@/queries/logistics/logistics.query";
import { Order } from "./Order";
import { useEffect } from "react";
import { useScreen } from "@/hooks/useScreen";

export const OrdersList = () => {
    const { filters } = useOrdersPageStore();
    useEffect(() => {
        console.log(filters, "filters")
    }, [filters])
    const { data: ordersList } = useOrdersList(filters);
    const { screenType } = useScreen();

    return (
        <ScrollShadow className="flex-1 w-full">
            <Grid cols={screenType === "widescreen" ? 3 : 1} gap={4} className="w-full">
                {ordersList?.map((order) => {
                    return <Order order={order} />
                })}
            </Grid>
        </ScrollShadow>

    )
}