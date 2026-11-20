import { ITicketsTechnicianStatisticsContext } from "../types/technicianStatistics.types";

import { TicketsCountsStatisticsType } from "@/types/statistics.types";

export type TechnicianStatisticsCardId =
    | "total"
    | "open"
    | "unassigned"
    | "assigned"
    | "overdue";

type StatisticsValueKey = keyof TicketsCountsStatisticsType;

type StatisticsActionKey =
    | "filterAllTickets"
    | "filterOpenTickets"
    | "filterUnassignedTickets"
    | "filterAssignedTickets"
    | "filterOverdueTickets";

export interface TechnicianStatisticsCardConfig {
    id: TechnicianStatisticsCardId;
    title: string;
    valueKey: StatisticsValueKey;
    actionKey: StatisticsActionKey;

    description: (
        context: ITicketsTechnicianStatisticsContext
    ) => string;
}

export const technicianStatisticsCardsConfig = [
    {
        id: "total",
        title: "Total tickets",
        valueKey: "totalTicketsCount",
        actionKey: "filterAllTickets",
        description: ({ todayNewTicketsCount }) =>
            todayNewTicketsCount && todayNewTicketsCount > 0
                ? `+${todayNewTicketsCount} this day`
                : "No new tickets today"
    },
    {
        id: "open",
        title: "Open tickets",
        valueKey: "openTicketsCount",
        actionKey: "filterOpenTickets",
        description: ({ openHighPriorityTicketsCount }) =>
            `${openHighPriorityTicketsCount ?? 0} high priority`
    },
    {
        id: "unassigned",
        title: "Unassigned tickets",
        valueKey: "unassignedTicketsCount",
        actionKey: "filterUnassignedTickets",
        description: ({ unassignedNewTicketsCount }) =>
            `${unassignedNewTicketsCount ?? 0} today's new tickets`
    },
    {
        id: "assigned",
        title: "Assigned to me",
        valueKey: "userAssignedTicketsCount",
        actionKey: "filterAssignedTickets",
        description: ({ userAssignedNewTicketsCount }) =>
            `${userAssignedNewTicketsCount ?? 0} assigned today`
    },
    {
        id: "overdue",
        title: "Overdue",
        valueKey: "overdueTicketsCount",
        actionKey: "filterOverdueTickets",
        description: () => "Created more than 15 days ago"
    }
] satisfies TechnicianStatisticsCardConfig[];