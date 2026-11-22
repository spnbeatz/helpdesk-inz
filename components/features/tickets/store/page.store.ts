import { createPageStore } from "@/store/factories/createPageStore";
import { initialTicketsFilters } from "../constants/filters.const";
import { TicketsPageFiltersType } from "../types/filters.types";

export const useTicketsPageStore =
    createPageStore<TicketsPageFiltersType>(
        { initialFilters: initialTicketsFilters }
    );