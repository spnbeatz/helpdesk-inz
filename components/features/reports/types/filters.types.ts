import { ReportListItemType, ReportStatus, ReportType } from "@/data/reports/types";
import { BaseFiltersType, DateRangeFiltersType, PaginationFiltersType } from "@/types/filters.types";

export type ReportSortKey = keyof ReportListItemType;

export type ReportsPageFiltersType = 
    BaseFiltersType<ReportSortKey> &
    DateRangeFiltersType &
    PaginationFiltersType & {
        created_by_id?: string,
        type?: ReportType,
        status?: ReportStatus
    }