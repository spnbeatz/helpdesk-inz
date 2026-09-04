import { useQuery } from "@tanstack/react-query";

import { getTicket, getTicketList } from "@/api/services/tickets.service";
import { TicketsPageFiltersType } from "@/store/pages/tickets.store";
import { ticketKeys } from "./tickets.keys";

export const useTicket = (id?: string) => {
    return useQuery({
        queryKey: id
            ? ticketKeys.detail(id)
            : ticketKeys.detail(""),
        queryFn: () => getTicket(id),
        enabled: !!id
    });
};

export const useTicketList = (filter?: TicketsPageFiltersType) => {
    return useQuery({
        queryKey: ticketKeys.list(filter),
        queryFn: () => getTicketList(filter || {})
    });
};