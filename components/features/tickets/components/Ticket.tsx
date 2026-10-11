import { Avatar, Card, Description, Label } from "@heroui/react";
import { formatRelativeDate } from "@/utils/date..util";
import { BasicChip } from "../../../ui/data-display/BasicChip";
import { TicketListItemType } from "@/api/services/tickets.service";
import { useModalStore } from "@/store/modals";
import { RiAttachment2 } from "react-icons/ri";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { highlightText } from "@/helpers/highlightText";
import { Row, Column } from "../../../ui/layout/flex";
import { TicketUser } from "./TicketUser";
import { TicketInfoChips } from "./TicketInfoChips";

export const Ticket = ({ ticket }: { ticket: TicketListItemType }) => {

    const { openModal } = useModalStore();
    const { filters } = useTicketsPageStore();

    const handleOpenViewModal = () => {
        openModal("viewTicket", { ticketId: ticket.id })
    }

    return (
        <Card className="bg-white/80 w-full p-4 rounded-lg flex flex-col items-start justify-center gap-2" onClick={handleOpenViewModal}>
            <Row CenterBetween className="w-full">
                <TicketUser ticket={ticket} />
                <TicketInfoChips ticket={ticket} />
            </Row>
            <p className="text-black/70">{highlightText(ticket.title, filters.searchValue)}</p>
            <p className="text-black/60 text-sm">{highlightText(ticket.description, filters.searchValue)}</p>
            <Row CenterBetween className=" w-full mt-auto">
                {
                    ticket.technician_id ? (
                        <Row StartCenter className="text-black/60 text-xs gap-1 ">
                            <p className="font-semibold">Assigned to: </p>
                            <p>{"Jan Kowalski"}</p>
                        </Row>
                    ) : (
                        <p className="text-black/60 text-xs">Not assigned yet</p>
                    )
                }

                <AttachmentCounter count={1} />
            </Row>
        </Card>
    )

}

export const AttachmentCounter = ({ count }: { count: number }) => {
    return (
        <Row Center className="opacity-70">
            <RiAttachment2 />
            <p>{count}</p>
        </Row>
    )
}
