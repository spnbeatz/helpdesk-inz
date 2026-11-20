import { TicketsCountsStatisticsType } from "@/types/statistics.types";

export interface IStatisticsService {
    getTicketsCountStatistics(userId?: string): Promise<TicketsCountsStatisticsType | null>,
}