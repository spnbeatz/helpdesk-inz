import { TicketType } from "@/data/exampleTicketsList";
import { BaseFiltersType, DateRangeFiltersType, PaginationFiltersType } from "@/types/filters.types";

export type TicketsSortKey = keyof TicketType;

export type TicketsPageFiltersType =
    BaseFiltersType<TicketsSortKey> &
    DateRangeFiltersType &
    PaginationFiltersType & {
        priorityId?: string[];
        categoryId?: string[];
        userId?: string;
        status?: "new" | "closed" | "all";
        technicianId?: string | null;
    };