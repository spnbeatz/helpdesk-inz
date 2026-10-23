import { TicketListItemType } from "@/api/services/tickets.service";

export const getTodayTicketsCount = (ticketsList?: TicketListItemType[]) => {
    return ticketsList?.filter(
        ticket =>
            new Date(ticket.created_at).toDateString() === new Date().toDateString()
    ).length || 0;
}

export const getHighPriorityCount = (ticketsList?: TicketListItemType[]) => {
    if (!ticketsList) return 0;
    return ticketsList.filter((ticket: TicketListItemType) => ticket.priority === "high").length;
}