"use client"

import { Modal } from "@/components/composed/modals/Modal";
import { TicketForm } from "../forms/TicketForm";

export type TicketFormModalProps = {
    ticketId?: string,
}

export const TicketFormModal = ({ data }: { data?: TicketFormModalProps }) => {

    return (
        <Modal isOpen isDismissable>
            <TicketForm ticketId={data?.ticketId} />
        </Modal>
    )
}
