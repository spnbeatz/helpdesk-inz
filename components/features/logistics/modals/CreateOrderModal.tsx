"use client"

import { useCreateOrderForm } from "../hooks/useCreateOrderForm";

import { Modal } from "@/components/composed/modals/Modal";
import { Column, Row } from "@/components/ui/layout/flex";
import { Description, Button } from "@heroui/react";
import { Title } from "@/components/ui/typography/Title";
import { Indeterminate } from "@/components/ui/feedback/Indeterminate";
import { OrderReasonField } from "../components/orders/create-order/OrderReasonField";
import { OrderTicketSelector } from "../components/orders/create-order/OrderTicketSelector";
import { OrderProductsSelector } from "../components/orders/create-order/OrderProductsSelector";


export type CreateOrderModalType = {
    ticketId?: string,
    itemId?: string
}

export const CreateOrderModal = ({ data = {} }: { data: CreateOrderModalType }) => {

    const { submit, errors, isPending } = useCreateOrderForm({
        ticketId: data.ticketId,
        itemId: data.itemId
    });

    return (
        <Modal isOpen size="cover" className="w-250">
            <Column StartBetween className="w-full gap-4">
                <Title title="Create order" />
                <Row StartBetween className="w-full gap-6">
                    <Column Start className="w-full gap-2">
                        <OrderReasonField />
                        <OrderTicketSelector />
                    </Column>
                    <Column Start className="w-full gap-2">
                        <OrderProductsSelector />
                    </Column>

                </Row>

                <Row CenterEnd className="w-full gap-2">
                    <ErrorText errors={errors} className="mr-auto gap-1" />
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="outline" onClick={submit}>
                        Create
                        {isPending && <Indeterminate />}
                    </Button>
                </Row>
            </Column>

        </Modal>
    )
}

export const ErrorText = ({ errors, className }: { errors: Object | null, className?: string }) => {
    const text = (value: string) => (
        <Description className="text-red-500/70">{value}</Description>
    )

    return (
        <Column StartCenter className={className}>
            {errors && Object.values(errors).map((error) => text(error))}
        </Column>
    )
}

