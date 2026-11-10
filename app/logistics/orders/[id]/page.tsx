"use client";

import { Column, Row } from "@/components/ui/layout/flex";
import { BackButton } from "@/components/ui/controls/buttons/BackButton";
import { OrderDetailsTabs } from "@/components/features/logistics/components/orders/order-details-tabs/OrderDetailsTabs";
import { OrderDetailsHeader } from "@/components/features/logistics/components/orders/OrderDetailsHeader";
import { OrderDetailsProvider } from "@/components/features/logistics/context/OrderDetailsProvider";



export default function OrderDetailsPage() {

    return (
        <OrderDetailsProvider>
            <Column Start className="w-full h-full">
                <BackButton />
                <OrderDetailsHeader />
                <OrderDetailsTabs />
            </Column>
        </OrderDetailsProvider>

    )
}
