"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Section } from "@/components/ui/surfaces/Section";
import { Grid } from "@/components/ui/layout/Grid";
import { useOrderDetails } from "../../../context/OrderDetailsProvider";
import { OrderItemDetailsType } from "@/data/orders/types";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { Description, Label, ProgressBar, ScrollShadow } from "@heroui/react";
import { equipmentTypeIcons } from "@/data/equipments";
import { AccordionItem } from "@/components/ui/data-display/AccordionItem";
import { getFulfillmentSummary } from "../../../helpers/getFulfilmentSummary";
import { Progress } from "@/components/ui/data-display/Progress";
import { formatRelativeDate } from "@/utils/date..util";

export const OrderDetailsProductsSourcingTab = () => {
    return (
        <Grid cols={4} gap={2} className="w-full h-full">
            <OrderProductsList />
        </Grid>
    )
}

export const OrderProductsList = () => {
    const { order } = useOrderDetails();
    return (
        <Section title="Ordered products" className="bg-white/60 rounded-lg shadow-sm p-6 col-span-3 gap-4">
            <ScrollShadow className="w-full">
                {order?.items.map((item) => (
                    <OrderProductsListItem item={item} />
                ))}
            </ScrollShadow>

        </Section>
    )
}

export const OrderProductsListItem = ({ item }: { item: OrderItemDetailsType }) => {

    const Icon = equipmentTypeIcons[item?.product?.type || "accessory"];
    const {ordered, received, progress} = getFulfillmentSummary(item);

    return (
        <AccordionItem
            className="rounded-lg bg-white mb-2 shadow-sm"
            indicator={false}
            body={<OrderProductsListItemBody item={item} />}
            key={item.id}
        >
            <Column Start className="w-full p-6 gap-2">
                <Row StartBetween className="w-full">
                    <Column Start>
                        <Row CenterStart className="gap-2">
                            <Label>{item.product?.name}</Label>
                            <Label className="font-normal">{item.product?.model}</Label>
                        </Row>
                        <Row CenterStart className="gap-2">
                            <Description>{item.item_id}</Description>
                        </Row>
                    </Column>
                    <Row Center className="gap-2">
                        <BasicChip>
                            <Description>{item.quantity} {item.quantity > 1 ? "items" : "item"}</Description>
                        </BasicChip>
                        <BasicChip>
                            <Icon />
                            <Description>{item.product?.type}</Description>
                        </BasicChip>
                    </Row>

                </Row>
                <Progress value={progress} label={`${received}/${ordered} received`}/>
            </Column>
        </AccordionItem>

    )
}

export const OrderProductsListItemBody = ({ item }: { item: OrderItemDetailsType }) => {
    return (
        <Column className="w-full p-6 gap-2">
            {item.fulfillments.map((fulfillment) => {
                return (
                    <Row StartBetween className="gap-2 w-full">
                        <Description>{fulfillment.order_item_id}</Description>
                        <Description>{formatRelativeDate(fulfillment.updated_at)}</Description>
                        <Description>{fulfillment.received_quantity}/{fulfillment.quantity}</Description>
                        <Description>{fulfillment.source_type}</Description>
                        <BasicChip>{fulfillment.status}</BasicChip>
                    </Row>
                )
            })}
        </Column>
    )
}