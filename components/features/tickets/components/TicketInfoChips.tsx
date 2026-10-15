import { Row } from "@/components/ui/layout/flex";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { TicketListItemType } from "@/api/services/tickets.service";

export const TicketInfoChips = ({ticket} : {ticket: TicketListItemType}) => {
    const priorityColors = {
        low: "green",
        medium: "yellow",
        high: "danger"
    }

    const statusColors = {
        new: undefined,
        closed: "white"
    }
    return (
        <Row Center className="gap-2">
            <BasicChip>{ticket.category}</BasicChip>
            <BasicChip color={statusColors[ticket.status] as "green" | "yellow" | "danger" | "white" | "normal" | undefined}>{ticket.status}</BasicChip>
            {ticket.priority && 
                <BasicChip 
                    color={priorityColors[ticket.priority as "low" | "medium" | "high"] as "normal" | "danger" | "green" | "yellow"}>
                    {ticket.priority}
                </BasicChip>}
        </Row>
    )
}