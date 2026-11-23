import { reportsService } from "@/api";
import { ReportsPageFiltersType } from "../types/filters.types";
import { useQuery } from "@tanstack/react-query";

export const useReportsList = (filters: ReportsPageFiltersType) => {
    return useQuery({
        queryKey: ["reports", filters],
        queryFn: () => reportsService.getReportsList(filters)
    })
}