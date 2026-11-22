import { TicketsPageFiltersType } from "../types/filters.types";

export const ticketKeys = {
    all: ["tickets"] as const,

    lists: () => [...ticketKeys.all, "list"] as const,

    list: (filter?: TicketsPageFiltersType) =>
        [...ticketKeys.lists(), filter] as const,

    details: () => [...ticketKeys.all, "detail"] as const,

    detail: (id: string) =>
        [...ticketKeys.details(), id] as const,
};