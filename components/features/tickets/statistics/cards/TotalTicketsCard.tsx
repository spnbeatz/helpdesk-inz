import { StatsCard } from "@/components/features/tickets/statistics/StatsCard";
import { TicketListItemType } from "@/api/services/tickets.service";
import { Tooltip, Button } from "@heroui/react";
import { LuArrowUp } from "react-icons/lu";

export const TotalTicketsCard = ({ ticketsList }: { ticketsList: TicketListItemType[] }) => {

    const getTodayTickets = () => {
        return ticketsList.filter(
            ticket =>
                new Date(ticket.created_at).toDateString() === new Date().toDateString()
        ).length;
    }
    
    return (
        <StatsCard
            title="Total tickets"
            quantity={ticketsList.length || 0}
            additionalIcon={
                <Tooltip delay={0}>
                    <Button variant="ghost" className={"p-0"}>
                        <p className="text-xs flex flex-row items-center justify-center"><LuArrowUp className="text-green-500" /> {getTodayTickets()}</p>
                    </Button>
                    <Tooltip.Content showArrow placement="bottom">
                        <Tooltip.Arrow />
                        <p>Quantity of new tickets this day</p>
                    </Tooltip.Content>
                </Tooltip>
            }
        />
    )
}