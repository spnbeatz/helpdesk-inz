import { useQuery } from "@tanstack/react-query"
import { getTicketsChartData, TicketsChartRange } from "@/api/services/statistics.service";
import { getDefaultRanges } from "@/helpers/tickets";
import { statisticsService } from "@/api";

export const useRangeStatistics = (
    range: TicketsChartRange
) => {
    return useQuery({
        queryKey: [
            "statistics",
            range.from,
            range.to
        ],

        queryFn: () => {
            return getTicketsChartData({
                from: range.from,
                to: range.to
            });
        },

        enabled: !!range
    });
};

export const useTicketsCountStatistics = (userId?: string) => {
    return useQuery({
        queryKey: ["statistics", "ticketsCount", userId],
        queryFn: () => statisticsService.getTicketsCountStatistics(userId),
        enabled: !!userId
    })
}