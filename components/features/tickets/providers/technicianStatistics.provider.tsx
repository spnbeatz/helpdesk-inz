"use client";

import { ReactNode, useCallback, useMemo } from "react";

import { useTicketsPageStore } from "../store/page.store";
import { useAuth } from "@/providers/auth.provider";

import { useTicketsCountStatistics } from "@/queries/statistics/statistics.query";
import { initialTicketsFilters } from "../constants/filters.const";
import { TicketsPageFiltersType } from "../types/filters.types";
import { TicketsTechnicianStatisticsContext } from "../context/technicianStatistics.context";

interface Props {
    children: ReactNode;
}

export const TicketsTechnicianStatisticsProvider = ({
    children
}: Props) => {

    const { setFilters } = useTicketsPageStore();
    const { user } = useAuth();

    const {
        data: statistics,
        isLoading,
        isError
    } = useTicketsCountStatistics(user?.id);

    const filter = useCallback((
        filters?: Partial<TicketsPageFiltersType>
    ) => {
        setFilters({
            ...initialTicketsFilters,
            ...filters
        });
    }, [setFilters]);

    const filterAllTickets = useCallback(() => {
        filter();
    }, [filter]);

    const filterOpenTickets = useCallback(() => {
        filter({ status: "pending" });
    }, [filter]);

    const filterUnassignedTickets = useCallback(() => {
        filter({ technicianId: null });
    }, [filter]);

    const filterAssignedTickets = useCallback(() => {
        if (!user?.id) return;

        filter({ technicianId: user.id });
    }, [filter, user?.id]);

    const filterOverdueTickets = useCallback(() => {
        const dateBefore = new Date(
            Date.now() - 15 * 24 * 60 * 60 * 1000
        ).toISOString();

        filter({ createdBefore: dateBefore, status: "pending" });
    }, [filter]);

    const value = useMemo(() => ({
        ...(statistics ?? {}),
        isLoading,
        isError,
        filterAllTickets,
        filterOpenTickets,
        filterUnassignedTickets,
        filterAssignedTickets,
        filterOverdueTickets
    }), [
        statistics,
        isLoading,
        isError,
        filterAllTickets,
        filterOpenTickets,
        filterUnassignedTickets,
        filterAssignedTickets,
        filterOverdueTickets
    ]);

    return (
        <TicketsTechnicianStatisticsContext.Provider value={value}>
            {children}
        </TicketsTechnicianStatisticsContext.Provider>
    );
};