import { useQuery } from "@tanstack/react-query"
import { getTicketsChartData, TicketsChartRange } from "@/api/services/statistics.service";
import { getDefaultRanges } from "@/helpers/tickets";

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