import { FilterConfig } from "@/components/composed/filters/types";
import { ReportSortKey, ReportsPageFiltersType } from "../types/filters.types";

export const reportsFiltersConfig: FilterConfig<ReportsPageFiltersType, ReportSortKey> = {
    sortOptions: [
        { value: "created_at", label: "Created at"},
        { value: "name", label: "Name"}
    ],
    filters: [
        {
            label: "Created between",
            type: "date-range",
            fromKey: "createdAfter",
            toKey: "createdBefore"
        }
    ]
}