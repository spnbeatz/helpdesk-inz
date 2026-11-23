import { PaginatedResponse } from "@/api/types"
import { ReportsPageFiltersType } from "@/components/features/reports/types/filters.types"
import { ReportListItemType } from "@/data/reports/types"

export interface IReportsService {
    getReportsList(
        filter: ReportsPageFiltersType
    ): Promise<PaginatedResponse<ReportListItemType>>;

    getReport(
        id: string
    ): Promise<ReportListItemType | null>
}