import { TicketType } from "@/data/exampleTicketsList";
import { create } from "zustand";

export type TicketsPageFiltersType = {
    sortBy?: keyof TicketType;
    sortDir?: "asc" | "desc";
    searchValue?: string;
    priorityId?: string;
    categoryId?: string;
    userId?: string;  
    status?: "new" | "closed" | "all";
    technicianId?: string | null,
    createdBefore?: string,
    createdAfter?: string,
    limit?: number
};

export const initialTicketsFilters: TicketsPageFiltersType = {
    sortBy: "created_at",
    sortDir: "desc",
    searchValue: "",
    priorityId: undefined,
    categoryId: undefined,
    userId: undefined,
    status: "all",
    technicianId: undefined,
    createdBefore: undefined,
    createdAfter: undefined,
    limit: undefined
}

type TicketsPageType = {
    title?: string;
    description?: string;
    listFilter: string;
    statsVisibility: boolean,
    setStatsVisibility: () => void,
    setPageData: (data: {
        title?: string;
        description?: string;
    }) => void;

    filters: TicketsPageFiltersType;

    setFilters: (filters: Partial<TicketsPageFiltersType>) => void;
    itemsPerPage: number
};

export const useTicketsPageStore = create<TicketsPageType>((set) => ({
    title: "All tickets",
    description: "Here you can find all tickets",
    listFilter: "all",
    statsVisibility: true,
    setStatsVisibility: () =>
        set((state) => ({
            statsVisibility: !state.statsVisibility,
        })),
    filters: initialTicketsFilters,

    setPageData: (data) => set(data),

    setFilters: (newFilters) =>
        set((state) => ({
            filters: {
                ...state.filters,
                ...newFilters,
            },
        })),
    itemsPerPage: 15
}));

