import { TicketType } from "@/data/exampleTicketsList";
import {
    BaseFiltersType,
    DateRangeFiltersType,
    PaginationFiltersType
} from "@/types/filters.types";
import { createPageStore } from "../factories/createPageStore";
import { createTableConfig } from "@/hooks/createTableConfig";
import { TicketListItemType } from "@/api/services/tickets.service";
import { ticketsDefaultColumns } from "@/components/features/tickets/config/ticketsTableColumns.config";

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


export const initialTicketsFilters: TicketsPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    status: "all",
    itemsPerPage: 15,
    page: 1,
    priorityId: [],
    categoryId: [],
    createdAfter: undefined,
    createdBefore: undefined
};

export const useTicketsPageStore =
    createPageStore<TicketsPageFiltersType>(
        {
            initialFilters: initialTicketsFilters,
        },
    );

export const useTicketsSettingsTableConfig =
    createTableConfig<TicketListItemType>(
        "tickets",
        ticketsDefaultColumns,
        "list"
    )