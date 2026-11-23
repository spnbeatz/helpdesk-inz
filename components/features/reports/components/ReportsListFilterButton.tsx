import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { useReportsPageStore } from "../store/page.store"
import { ReportSortKey, ReportsPageFiltersType } from "../types/filters.types";
import { reportsFiltersConfig } from "../config/filters.config";
import { useCallback } from "react";
import { initialReportsFilters } from "../constants/filters.const";

export const ReportsListFilterButton = () => {
    const setFilters = useReportsPageStore(state => state.setFilters);
    const filters = useReportsPageStore(state => state.filters);

    const onClear = useCallback(() => {
        setFilters(initialReportsFilters)
    },[setFilters])

    return (
        <FilterPopover<ReportSortKey, ReportsPageFiltersType>
            config={reportsFiltersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={onClear}
        />
    )
}