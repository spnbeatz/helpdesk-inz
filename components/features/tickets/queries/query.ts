import { useQuery } from "@tanstack/react-query";
import { TicketsPageFiltersType } from "../types/filters.types";
import { ticketKeys } from "./keys";
import { ticketsService } from "@/api";

export const useTicket = (id?: string) => {
    return useQuery({
        queryKey: id
            ? ticketKeys.detail(id)
            : ticketKeys.detail(""),
        queryFn: () => ticketsService.getTicket(id),
        enabled: !!id
    });
};

export const useTicketList = (filter?: TicketsPageFiltersType) => {
    return useQuery({
        queryKey: ticketKeys.list(filter),
        queryFn: () => ticketsService.getTicketList(filter || {})
    });
};