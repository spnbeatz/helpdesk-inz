"use client"

import { Modal } from "@/components/composed/modals/Modal";
import { Column } from "@/components/ui/layout/flex";
import { useTicket } from "@/queries/tickets/tickets.query";
import { TicketHeaderSection } from "../sections/TicketHeaderSection";
import { TicketMainSection } from "../sections/TicketMainSection";
import { TicketAttachmentsSection } from "../sections/TicketAttachmentsSection";
import { TicketCommentsSection } from "../sections/TicketCommentsSection";

export type TicketViewModalProps = {
    ticketId?: string
}

export const TicketViewModal = ({ data }: { data: TicketViewModalProps }) => {

    const { data: ticketData } = useTicket(data?.ticketId);

    if (!ticketData) return null;

    return (
        <Modal isDismissable isOpen size="cover" className="w-[700px]" closeTrigger>
            <Column StartBetween className="gap-6 w-full h-full">
                <TicketHeaderSection ticket={ticketData} />
                <TicketMainSection ticket={ticketData} />
                <TicketAttachmentsSection />
                <TicketCommentsSection />
            </Column>

        </Modal>
    )
}
