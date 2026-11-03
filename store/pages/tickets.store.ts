import { TicketType } from "@/data/exampleTicketsList";
import {
    BaseFiltersType,
    DateRangeFiltersType,
    PaginationFiltersType
} from "@/types/filters.types";
import { createPageStore } from "../factories/createPageStore";

type TicketsSortKey = keyof TicketType;

export type TicketsPageFiltersType =
    BaseFiltersType<TicketsSortKey> &
    DateRangeFiltersType &
    PaginationFiltersType & {
        priorityId?: string;
        categoryId?: string;
        userId?: string;
        status?: "new" | "closed" | "all";
        technicianId?: string | null;
    };


export const initialTicketsFilters: TicketsPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    status: "all"
};

export const useTicketsPageStore =
    createPageStore<TicketsPageFiltersType>(
        {
            initialFilters: initialTicketsFilters,
            itemsPerPage: 15
        },
    );