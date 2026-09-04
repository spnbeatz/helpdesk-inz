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
};

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

    otherFilters: TicketsPageFiltersType;

    setFilters: (
        filterName: string,
        value: string
    ) => void;
    itemsPerPage: number
};

export const useTicketsPageStore = create<TicketsPageType>((set) => ({
    title: undefined,
    description: undefined,
    listFilter: "all",
    statsVisibility: true,
    setStatsVisibility: () =>
        set((state) => ({
            statsVisibility: !state.statsVisibility,
        })),
    otherFilters: {
        sortBy: "created_at",
        sortDir: "desc",
        searchValue: "",
        priority: "all",
    },

    setPageData: (data) => set(data),

    setFilters: (filterName, value) =>
        set((state) => ({
            otherFilters: {
                ...state.otherFilters,
                [filterName]: value,
            },
        })),
    itemsPerPage: 15
}));