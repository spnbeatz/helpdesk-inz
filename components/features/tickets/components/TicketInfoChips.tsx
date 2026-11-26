import { Row } from "@/components/ui/layout/flex";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { TicketListItemType } from "@/api/services/tickets.service";
import { TicketStatusChip } from "./TicketStatusChip";

export const TicketInfoChips = ({ ticket }: { ticket: TicketListItemType }) => {

    return (
        <Row Center className="gap-2">
            <BasicChip>{ticket.category}</BasicChip>
            <TicketStatusChip status={ticket.status} />
            <PriorityChip priority={ticket.priority} />
        </Row>
    )
}

export const PriorityChip = ({ priority }: { priority?: string }) => {
    const priorityColors = {
        low: "green",
        medium: "yellow",
        high: "danger"
    }

    if(!priority) return null;

    return (
        <BasicChip
            color={priorityColors[priority as "low" | "medium" | "high"] as "normal" | "danger" | "green" | "yellow"}>
            {priority}
        </BasicChip>
    )

}