import { TicketType } from "@/data/exampleTicketsList"
import { Avatar, Button, Card, Chip, Description, Label } from "@heroui/react";
import { formatRelativeDate } from "@/utils/date..util";
import { BasicChip } from "../other/BasicChip";
import { TicketListItemType } from "@/api/services/tickets.service";
import { useModalStore } from "@/store/modals";
import { RiAttachment2 } from "react-icons/ri";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { highlightText } from "@/helpers/highlightText";

export const Ticket = ({ ticket }: { ticket: TicketListItemType }) => {

    const { openModal } = useModalStore();
    const { otherFilters } = useTicketsPageStore();

    const handleOpenEditModal = () => {
        openModal("ticketForm", { ticketId: ticket.id })
    }

    return (
        <Card className="bg-white/80 w-full p-4 rounded-lg flex flex-col items-start justify-center gap-2" onClick={handleOpenEditModal}>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-2">
                    <Avatar size="sm" className="rounded-lg">
                        <Avatar.Image src="https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" />
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                        <Label className="text-black/70">spnbeatz@gmail.com</Label>
                        <Description>{formatRelativeDate(ticket.created_at)}</Description>
                    </div>

                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <BasicChip>{ticket.category}</BasicChip>
                    <BasicChip>{ticket.status}</BasicChip>
                    <BasicChip color="danger">{ticket.priority}</BasicChip>
                </div>
            </div>
            <p className="text-black/70">{highlightText(ticket.title, otherFilters.searchValue)}</p>
            <p className="text-black/60 text-sm">{highlightText(ticket.description, otherFilters.searchValue)}</p>
            <div className="flex flex-row items-center justify-between w-full mt-auto">
                {
                    ticket.technician_id ? (
                        <div className="text-black/60 text-xs flex flex-row items-start justify-center gap-1 ">
                            <p className="font-semibold">Assigned to: </p>
                            <p>{"Jan Kowalski"}</p>
                        </div>
                    ) : (
                        <p className="text-black/60 text-xs">Not assigned yet</p>
                    )
                }

                <AttachmentCounter count={1} />
            </div>
        </Card>
    )

}

export const AttachmentCounter = ({ count }: { count: number }) => {
    return (
        <RowCenter className="opacity-70">
            <RiAttachment2 />
            <p>{count}</p>
        </RowCenter>
    )
}

export const RowCenter = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return (
        <div className={`flex flex-row items-center justify-center ${className}`}>{children}</div>
    )
}