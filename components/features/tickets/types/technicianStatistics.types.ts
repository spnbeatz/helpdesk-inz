import { TicketsCountsStatisticsType } from "@/types/statistics.types";

export interface ITicketsTechnicianStatisticsContext extends
    TicketsCountsStatisticsType {

    isLoading: boolean;
    isError: boolean;

    filterAllTickets: () => void;
    filterOpenTickets: () => void;
    filterUnassignedTickets: () => void;
    filterAssignedTickets: () => void;
    filterOverdueTickets: () => void;
}