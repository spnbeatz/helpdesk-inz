import { TicketListItemType } from "@/api/services/tickets.service"
import { Column, Row } from "@/components/ui/layout/flex"
import { Description } from "@heroui/react";
import { TicketActions } from "../components/TicketActions";
import { TicketUser } from "../components/TicketUser";
import { TicketInfoChips } from "../components/TicketInfoChips";

export const TicketHeaderSection = ({ ticket }: { ticket: TicketListItemType }) => {
    return (
        <Column Start className="w-full gap-6 mt-4">
            <Row CenterBetween className="w-full">
                <Description>{ticket.id}</Description>
                <TicketActions ticket={ticket} />
            </Row>
            <Row CenterBetween className="w-full">
                <TicketUser ticket={ticket} />
                <TicketInfoChips ticket={ticket} />
            </Row>
        </Column>
    )
}