import { TicketListItemType } from "@/api/services/tickets.service"
import { Column, Row } from "@/components/ui/layout/flex"
import { Description } from "@heroui/react";
import { TicketUser } from "../components/TicketUser";
import { TicketInfoChips } from "../components/TicketInfoChips";
import { TicketOptionsDropdown } from "../components/TicketOptionsDropdown";

export const TicketHeaderSection = ({ ticket }: { ticket: TicketListItemType }) => {
    return (
        <Column Start className="w-full gap-6 mt-4">
            <Description>{ticket.id}</Description>
            <Row CenterBetween className="w-full">
                <TicketUser ticket={ticket} />
                <Row Center className="gap-4">
                    <TicketInfoChips ticket={ticket} />
                    <TicketOptionsDropdown ticket={ticket} />
                </Row>

            </Row>
        </Column>
    )
}