import { Modal } from "@/components/composed/modals/Modal"
import { TicketAttachmentsForm } from "../forms/TicketAttachmentsForm";
import { TicketType } from "@/data/exampleTicketsList";
import { TicketListItemType } from "@/api/services/tickets.service";

export type TicketAttachmentsModalProps = {
    ticket: TicketListItemType
}

export const TicketAttachmentsModal = ({data}: {data: TicketAttachmentsModalProps}) => {
    return (
        <Modal isOpen>
            <TicketAttachmentsForm ticket={data.ticket}/>
        </Modal>
    )
}