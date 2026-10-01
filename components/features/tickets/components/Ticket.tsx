import { Avatar, Card, Description, Label } from "@heroui/react";
import { formatRelativeDate } from "@/utils/date..util";
import { BasicChip } from "../../../ui/data-display/BasicChip";
import { TicketListItemType } from "@/api/services/tickets.service";
import { useModalStore } from "@/store/modals";
import { RiAttachment2 } from "react-icons/ri";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { highlightText } from "@/helpers/highlightText";
import { Row, Column } from "../../../ui/layout/flex";

export const Ticket = ({ ticket }: { ticket: TicketListItemType }) => {

    const { openModal } = useModalStore();
    const { filters } = useTicketsPageStore();

    const handleOpenEditModal = () => {
        openModal("ticketForm", { ticketId: ticket.id })
    }

    return (
        <Card className="bg-white/80 w-full p-4 rounded-lg flex flex-col items-start justify-center gap-2" onClick={handleOpenEditModal}>
            <Row CenterBetween className="w-full">
                <Row Center className="gap-2">
                    <Avatar size="sm" className="rounded-lg">
                        <Avatar.Image src="https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" />
                    </Avatar>
                    <Column className="justify-center">
                        <Label className="text-black/70">spnbeatz@gmail.com</Label>
                        <Description>{formatRelativeDate(ticket.created_at)}</Description>
                    </Column>

                </Row>
                <Row Center className="gap-2">
                    <BasicChip>{ticket.category}</BasicChip>
                    <BasicChip>{ticket.status}</BasicChip>
                    <BasicChip color="danger">{ticket.priority}</BasicChip>
                </Row>
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
