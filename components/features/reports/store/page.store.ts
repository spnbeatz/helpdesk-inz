import { createPageStore } from "@/store/factories/createPageStore";
import { initialReportsFilters } from "../constants/filters.const";
import { ReportsPageFiltersType } from "../types/filters.types";

export const useReportsPageStore =
    createPageStore<ReportsPageFiltersType>(
        { initialFilters: initialReportsFilters }
    )