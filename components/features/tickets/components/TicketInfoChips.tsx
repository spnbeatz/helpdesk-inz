import { Row } from "@/components/ui/layout/flex";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { TicketListItemType } from "@/api/services/tickets.service";

export const TicketInfoChips = ({ticket} : {ticket: TicketListItemType}) => {
    return (
        <Row Center className="gap-2">
            <BasicChip>{ticket.category}</BasicChip>
            <BasicChip>{ticket.status}</BasicChip>
            <BasicChip color="danger">{ticket.priority}</BasicChip>
        </Row>
    )
}