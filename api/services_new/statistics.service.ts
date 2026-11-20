import { TicketsCountsStatisticsType } from "@/types/statistics.types";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { IStatisticsService } from "../interfaces/services/statistics.interface";
import { ticketsList } from "@/data/exampleTicketsList";
import { getTodayTicketsCount } from "@/helpers/ticketCounts";
import { ticketsService } from "..";

export class StatisticsService implements IStatisticsService {

    private endpoint: string = "/statistics"

    constructor(
        private readonly api: IApiClient
    ) { }

    async getTicketsCountStatistics(userId?: string): Promise<TicketsCountsStatisticsType | null> {

        if (!userId) return null;

        const ticketsResponse = await ticketsService.getTicketList({});
        const tickets = ticketsResponse.items;

        const dateBefore = new Date(
            Date.now() - 15 * 24 * 60 * 60 * 1000
        ).toISOString();

        const totalTicketsCount = tickets.length;
        const todayNewTicketsCount = getTodayTicketsCount(tickets);
        const openTicketsCount = tickets.filter((ticket) => ticket.status === "new").length;
        const openHighPriorityTicketsCount = tickets.filter((ticket) => ticket.status === "new" && ticket.priority === "high").length
        const unassignedTicketsCount = tickets.filter((ticket) => ticket.technician_id === null).length;
        const unassignedNewTicketsCount = tickets.filter((ticket) => ticket.technician_id === null && ticket.status === "new").length
        const userAssignedTicketsCount = tickets.filter((ticket) => ticket.technician_id === userId).length;
        const userAssignedNewTicketsCount = getTodayTicketsCount(
            tickets.filter((ticket) => ticket.technician_id === userId)
        )
        const overdueTicketsCount = tickets.filter((ticket) => {
            const createdAt = new Date(ticket.created_at);
            const threshold = new Date(dateBefore);

            const isValidDate = !Number.isNaN(createdAt.getTime());
            const isOlder = isValidDate && createdAt < threshold;
            const isNew = ticket.status === "new";

            console.log({
                created_at: ticket.created_at,
                parsedDate: createdAt,
                threshold,
                isValidDate,
                isOlder,
                status: ticket.status,
                isNew
            });

            return isOlder && isNew;
        }).length;

        return {
            totalTicketsCount,
            todayNewTicketsCount,
            openTicketsCount,
            openHighPriorityTicketsCount,
            userAssignedTicketsCount,
            unassignedNewTicketsCount,
            unassignedTicketsCount,
            overdueTicketsCount,
            userAssignedNewTicketsCount
        }
    }
}