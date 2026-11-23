import { ReportListItemType } from "@/data/reports/types";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { IReportsService } from "../interfaces/services/reports.interface";
import { reports } from "@/data/reports/mock";
import { ReportsPageFiltersType } from "@/components/features/reports/types/filters.types";
import { PaginatedResponse } from "../types";
import { createPaginatedData, searchResults, sortResults } from "../utils";

export class ReportsService implements IReportsService {

    private endpoint: string = "/reports"

    constructor(
        private readonly api: IApiClient
    ) { }

    async getReport(id: string): Promise<ReportListItemType | null> {
        const report = reports.find((report) => report.id === id);

        return report || null;
    }

    async getReportsList(filter: ReportsPageFiltersType): Promise<PaginatedResponse<ReportListItemType>> {

        const {
            page,
            itemsPerPage
        } = filter;

        let result = [...reports];

        if (filter.created_by_id) {
            result = result.filter((report) => report.created_by_id === filter.created_by_id)
        }

        if (filter.status) {
            result = result.filter((report) => report.status === filter.status)
        }

        if (filter.type) {
            result = result.filter((report) => report.type === filter.type)
        }

        if (filter.createdAfter) {
            const after = new Date(filter.createdAfter);

            result = result.filter(
                ticket => new Date(ticket.created_at) >= after
            );
        }

        if (filter.createdBefore) {
            const before = new Date(filter.createdBefore);

            result = result.filter(
                ticket => new Date(ticket.created_at) <= before
            );
        }

        result = searchResults<ReportListItemType>(
            result,
            filter.searchValue,
            ["name"]
        )

        result = sortResults<ReportListItemType>(
            result,
            filter.sortBy, filter.sortDir
        )

        const data = createPaginatedData<ReportListItemType>(
            result,
            { page, itemsPerPage } 
        );

        return data;
    }
}